#!/usr/bin/env python3
"""Generate PDF versions of the GAC dashboard reports.

Each PDF mirrors its PowerPoint counterpart in public/reports/. The bulk of the
content (snapshot KPIs, breakdown chart, narrative, follow-ups) is read straight
from the .pptx so the two formats stay in sync; the evidence tables are mapped
explicitly here because their slide layout is irregular.

Run from the project root:  python3 scripts/generate_report_pdfs.py
"""

import glob
import json
import os
import re
import zipfile

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

REPORTS_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "reports")
REPORTS_DIR = os.path.abspath(REPORTS_DIR)

BRAND = HexColor("#4b2383")
BRAND_SOFT = HexColor("#efe8dd")
INK = HexColor("#241043")
MUTE = HexColor("#6b6479")
HAIRLINE = HexColor("#e4ded6")
BADGE_COLORS = {
    "HIGH": HexColor("#b3261e"),
    "MEDIUM": HexColor("#9a6b00"),
    "LOW": HexColor("#3f7d4f"),
}

CHART_TITLES = {
    "Active project mix",
    "People reached by region",
    "Funding deployed by region",
    "Outstanding loan aging",
    "Member status mix",
    "Projects by theme",
    "Validation flags by severity",
}

# Evidence-to-watch rows, keyed by report slug. {title, detail, badge?}
EVIDENCE = {
    "executive-impact-summary": [
        {"title": "7 projects require follow-up", "badge": "HIGH",
         "detail": "Water and sanitation in Garissa County has the highest current risk flag."},
        {"title": "15 member reports overdue", "badge": "HIGH",
         "detail": "Mostly from Nyanza, with reach figures and activity logs still pending."},
        {"title": "0 loan accounts overdue", "badge": "LOW",
         "detail": "No overdue loan balances in the selected view."},
        {"title": "KES 77.2M estimated funding gap", "badge": "HIGH",
         "detail": "Youth skills and livelihoods carries the largest unfunded need at KES 16.4M."},
    ],
    "donor-funding-report": [
        {"title": "Rift Valley", "detail": "KES 25.4M · Regional deployment total"},
        {"title": "Coast", "detail": "KES 22.4M · Regional deployment total"},
        {"title": "Northern Kenya", "detail": "KES 17.9M · Regional deployment total"},
        {"title": "Nairobi Metro", "detail": "KES 13.1M · Regional deployment total"},
        {"title": "Western Kenya", "detail": "KES 11.8M · Regional deployment total"},
    ],
    "county-performance-report": [
        {"title": "Northern Kenya", "detail": "8 projects · 38K reached; 2 risk flags"},
        {"title": "Coast", "detail": "8 projects · 34K reached; 2 risk flags"},
        {"title": "Rift Valley", "detail": "8 projects · 33K reached; 1 risk flag"},
        {"title": "Central Kenya", "detail": "4 projects · 24K reached; 0 risk flags"},
        {"title": "Nairobi Metro", "detail": "5 projects · 17K reached; 0 risk flags"},
    ],
    "project-portfolio-report": [
        {"title": "Community Health Volunteer Outreach - Webuye", "badge": "HIGH",
         "detail": "Bungoma · 63% complete; high risk"},
        {"title": "Dryland Climate Resilience Grants - Kaptembwa", "badge": "HIGH",
         "detail": "Nakuru · 61% complete; high risk"},
        {"title": "County Youth Skills Accelerator - Suna", "badge": "HIGH",
         "detail": "Migori · 59% complete; high risk"},
        {"title": "Savings Group Strengthening - Dadaab", "badge": "HIGH",
         "detail": "Garissa · 57% complete; high risk"},
        {"title": "Peace Forums and Civic Voice - Kalokol", "badge": "LOW",
         "detail": "Turkana · 71% complete; low risk"},
    ],
    "loan-portfolio-report": [
        {"title": "Current", "detail": "18 accounts · KES 8.2M"},
        {"title": "Due in 30 days", "detail": "1 account · KES 700K"},
        {"title": "1-30 overdue", "detail": "0 accounts · KES 0"},
        {"title": "31-60 overdue", "detail": "1 account · KES 300K"},
        {"title": "61-90 overdue", "detail": "0 accounts · KES 0"},
    ],
    "member-engagement-report": [
        {"title": "Machakos Food Security Collective", "detail": "Kisumu · 90% engagement; current"},
        {"title": "Ngong Civic Voice Network", "detail": "Uasin Gishu · 90% engagement; due soon"},
        {"title": "Mwala Local Advocacy Platform", "detail": "Machakos · 90% engagement; current"},
        {"title": "Suna Youth Skills Hub", "detail": "Migori · 90% engagement; overdue"},
        {"title": "Kisumu Youth Skills Hub", "detail": "Homa Bay · 89% engagement; current"},
    ],
    "data-quality-report": [
        {"title": "Turkana Pastoralist Resilience Initiative", "badge": "MEDIUM",
         "detail": "Programs · in review"},
        {"title": "Garissa Peace and Livelihoods Group", "badge": "HIGH",
         "detail": "Finance · open"},
        {"title": "Kilifi Women Enterprise Forum", "badge": "MEDIUM",
         "detail": "M&E · open"},
        {"title": "Mukuru Social Enterprise Network", "badge": "LOW",
         "detail": "Partnerships · resolved"},
        {"title": "County upload 2026-05", "badge": "MEDIUM",
         "detail": "Data · open"},
    ],
}


def slide_texts(zf, name):
    xml = zf.read(name).decode("utf-8", "ignore")
    runs = re.findall(r"<a:t>(.*?)</a:t>", xml, re.S)
    return [r.replace("&amp;", "&").strip() for r in runs]


def read_report(path):
    zf = zipfile.ZipFile(path)
    slide_names = sorted(
        (n for n in zf.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)),
        key=lambda s: int(re.findall(r"\d+", s)[0]),
    )
    slides = [slide_texts(zf, n) for n in slide_names]
    s1, s2, s3 = slides[0], slides[1], slides[2]

    # Slide 1: header + KPI snapshot.
    as_of_idx = next(i for i, t in enumerate(s1) if t.startswith("As of"))
    category = s1[0]
    title = s1[1]
    audience = s1[as_of_idx - 1]
    as_of = s1[as_of_idx]
    subtitle = " ".join(s1[2:as_of_idx - 1])
    kpi_runs = s1[as_of_idx + 1:]
    kpis = [kpi_runs[i:i + 3] for i in range(0, len(kpi_runs) - len(kpi_runs) % 3, 3)]

    # Slide 2: narrative + breakdown chart.
    chart_idx = next(i for i, t in enumerate(s2) if t in CHART_TITLES)
    snapshot_idx = s2.index("Report snapshot")
    narrative = " ".join(s2[2:chart_idx])
    chart_title = s2[chart_idx]
    chart_runs = s2[chart_idx + 1:snapshot_idx]
    chart = [(chart_runs[i], chart_runs[i + 1]) for i in range(0, len(chart_runs) - 1, 2)]

    # Slide 3: recommended follow-ups.
    f_idx = s3.index("Recommended follow-ups")
    e_idx = s3.index("Evidence to watch")
    follow_block = s3[f_idx + 1:e_idx]
    follow_ups, current = [], []
    for tok in follow_block:
        if tok in {"1", "2", "3", "4", "5"}:
            if current:
                follow_ups.append(" ".join(current))
            current = []
        else:
            current.append(tok)
    if current:
        follow_ups.append(" ".join(current))

    slug = re.sub(r"^gac-|\.pptx$", "", os.path.basename(path))
    return {
        "slug": slug,
        "category": category,
        "title": title,
        "audience": audience,
        "as_of": as_of,
        "subtitle": subtitle,
        "kpis": kpis,
        "narrative": narrative,
        "chart_title": chart_title,
        "chart": chart,
        "follow_ups": follow_ups,
        "evidence": EVIDENCE[slug],
    }


def to_number(value):
    m = re.search(r"([\d,.]+)\s*([KM]?)", value.replace(",", ""))
    if not m:
        return 0.0
    n = float(m.group(1))
    if m.group(2) == "K":
        n *= 1_000
    elif m.group(2) == "M":
        n *= 1_000_000
    return n


class BarChart(Flowable):
    """Horizontal bar list: label, proportional bar, value."""

    def __init__(self, rows, width, label_w=58 * mm, value_w=26 * mm):
        super().__init__()
        self.rows = rows
        self.width = width
        self.label_w = label_w
        self.value_w = value_w
        self.row_h = 8.4 * mm
        self.height = self.row_h * len(rows)

    def wrap(self, *_):
        return self.width, self.height

    def draw(self):
        c = self.canv
        track_x = self.label_w + 3 * mm
        track_w = self.width - self.label_w - self.value_w - 6 * mm
        peak = max((to_number(v) for _, v in self.rows), default=0) or 1
        for i, (label, value) in enumerate(self.rows):
            y = self.height - (i + 1) * self.row_h + 2.2 * mm
            cy = y + 0.6 * mm
            c.setFont("Helvetica", 8.6)
            c.setFillColor(INK)
            c.drawString(0, cy, label[:38])
            c.setFillColor(HAIRLINE)
            c.roundRect(track_x, y, track_w, 3.4 * mm, 1.4, stroke=0, fill=1)
            bw = max(track_w * to_number(value) / peak, 1.2)
            c.setFillColor(BRAND)
            c.roundRect(track_x, y, bw, 3.4 * mm, 1.4, stroke=0, fill=1)
            c.setFont("Helvetica-Bold", 8.6)
            c.setFillColor(MUTE)
            c.drawRightString(self.width, cy, value)


def kpi_grid(kpis, width):
    cells = []
    for value, label, detail in kpis:
        block = (
            f'<para><font size=15 color="#4b2383"><b>{value}</b></font><br/>'
            f'<font size=8.5 color="#241043"><b>{label}</b></font><br/>'
            f'<font size=7.6 color="#6b6479">{detail}</font></para>'
        )
        cells.append(Paragraph(block, ParagraphStyle("kpi", leading=12)))
    rows = [cells[i:i + 2] for i in range(0, len(cells), 2)]
    col_w = (width - 4 * mm) / 2
    table = Table(rows, colWidths=[col_w, col_w])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BRAND_SOFT),
        ("BOX", (0, 0), (-1, -1), 0, white),
        ("INNERGRID", (0, 0), (-1, -1), 4, white),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return table


def evidence_table(rows, styles, width):
    body = []
    for r in rows:
        badge = ""
        if r.get("badge"):
            color = BADGE_COLORS.get(r["badge"], MUTE).hexval()[2:]
            badge = f'  <font size=7 color="#{color}"><b>{r["badge"]}</b></font>'
        cell = (
            f'<para><font size=9 color="#241043"><b>{r["title"]}</b></font>{badge}<br/>'
            f'<font size=8 color="#6b6479">{r["detail"]}</font></para>'
        )
        body.append([Paragraph(cell, styles["cell"])])
    table = Table(body, colWidths=[width])
    table.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, -2), 0.5, HAIRLINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def make_styles():
    base = getSampleStyleSheet()["BodyText"]
    return {
        "eyebrow": ParagraphStyle("eyebrow", parent=base, fontName="Helvetica-Bold",
                                  fontSize=8.5, textColor=BRAND, leading=11,
                                  spaceAfter=3),
        "title": ParagraphStyle("title", parent=base, fontName="Helvetica-Bold",
                                 fontSize=21, textColor=INK, leading=24, spaceAfter=4),
        "meta": ParagraphStyle("meta", parent=base, fontName="Helvetica",
                               fontSize=9, textColor=MUTE, leading=12, spaceAfter=8),
        "subtitle": ParagraphStyle("subtitle", parent=base, fontName="Helvetica",
                                   fontSize=11, textColor=INK, leading=15, spaceAfter=4),
        "section": ParagraphStyle("section", parent=base, fontName="Helvetica-Bold",
                                  fontSize=10, textColor=BRAND, leading=13,
                                  spaceBefore=12, spaceAfter=6, alignment=TA_LEFT),
        "body": ParagraphStyle("body", parent=base, fontName="Helvetica",
                               fontSize=9.5, textColor=INK, leading=14),
        "follow": ParagraphStyle("follow", parent=base, fontName="Helvetica",
                                 fontSize=9.5, textColor=INK, leading=14,
                                 leftIndent=14, firstLineIndent=-14, spaceAfter=5),
        "cell": ParagraphStyle("cell", parent=base, fontSize=9, leading=12),
    }


def build_pdf(report, out_path):
    styles = make_styles()
    page_w, page_h = A4
    margin = 18 * mm
    content_w = page_w - 2 * margin

    def decorate(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(BRAND)
        canvas.rect(0, page_h - 6 * mm, page_w, 6 * mm, stroke=0, fill=1)
        canvas.setFillColor(MUTE)
        canvas.setFont("Helvetica", 7.5)
        canvas.drawString(margin, 11 * mm,
                          "GAC Impact Intelligence Dashboard")
        canvas.drawRightString(page_w - margin, 11 * mm,
                               f"{report['as_of']}  ·  page {doc.page}")
        canvas.setStrokeColor(HAIRLINE)
        canvas.setLineWidth(0.5)
        canvas.line(margin, 14 * mm, page_w - margin, 14 * mm)
        canvas.restoreState()

    frame = Frame(margin, 16 * mm, content_w, page_h - 16 * mm - 12 * mm,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc = BaseDocTemplate(out_path, pagesize=A4, title=report["title"],
                          author="GAC Impact Intelligence Dashboard")
    doc.addPageTemplates([PageTemplate(id="report", frames=[frame],
                                       onPage=decorate)])

    story = [
        Paragraph(report["category"], styles["eyebrow"]),
        Paragraph(report["title"], styles["title"]),
        Paragraph(f"{report['as_of']}  ·  {report['audience']}", styles["meta"]),
        Paragraph(report["subtitle"], styles["subtitle"]),
        Spacer(1, 8),
        Paragraph("Snapshot", styles["section"]),
        kpi_grid(report["kpis"], content_w),
        Paragraph(report["chart_title"], styles["section"]),
        BarChart(report["chart"], content_w),
        Paragraph("Summary", styles["section"]),
        Paragraph(report["narrative"], styles["body"]),
        Paragraph("Recommended follow-ups", styles["section"]),
    ]
    for i, item in enumerate(report["follow_ups"], 1):
        story.append(Paragraph(f"<b>{i}.</b>&nbsp;&nbsp;{item}", styles["follow"]))
    story.append(Paragraph("Evidence to watch", styles["section"]))
    story.append(evidence_table(report["evidence"], styles, content_w))

    doc.build(story)


def main():
    artifacts = []
    for path in sorted(glob.glob(os.path.join(REPORTS_DIR, "*.pptx"))):
        report = read_report(path)
        out_path = re.sub(r"\.pptx$", ".pdf", path)
        build_pdf(report, out_path)
        size = os.path.getsize(out_path)
        artifacts.append((os.path.basename(out_path), size))
        print(f"wrote {os.path.basename(out_path)}  ({size/1024:.0f} KB)")
    print(json.dumps(dict(artifacts), indent=1))


if __name__ == "__main__":
    main()
