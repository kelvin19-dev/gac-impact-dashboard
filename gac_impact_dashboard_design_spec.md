# GAC Impact Intelligence Dashboard — Design Specification

> **Design language:** warm-institutional canvas · royal-purple structure · rationed-gold accent · tabular-precise data. See **§6** for the full premium design system and tokens.
> _Last updated: 2026-06-04._

## 1. Purpose

Build a polished demo dashboard for pitching Afriquity’s data and digital transformation services to Global Alliance for Communities (GAC).

The dashboard should not feel like a generic NGO report. It should feel like an executive-grade impact intelligence product: calm, credible, transparent, and useful for decision-making.

The demo should show how GAC can track its network of grassroots organizations, community impact, funding flows, loans/grants, project themes, geographic reach, and evidence of locally led development.

## 2. Strategic Context

GAC describes itself as a coalition of community-based grassroots organizations of color driving impact in underserved populations across the Global South. Its mission centers on grassroots leadership, research, advocacy, resource mobilization, systemic change, local solutions, and equitable funding.

The dashboard should therefore emphasize:

- Community-led impact.
- Resource mobilization and equitable funding.
- Visibility of grassroots organizations.
- Evidence of reach and outcomes.
- Cross-country / regional coordination.
- Advocacy and learning value, not only finance tracking.

Afriquity should be positioned as the technology partner that turns fragmented community, grant, loan, membership, and project data into a trusted operating picture.

## 3. Core Product Concept

**Working title:** GAC Impact Intelligence Dashboard

**One-line description:**  
A unified dashboard for monitoring GAC’s community network, funding support, project portfolio, beneficiary reach, and repayment / sustainability indicators.

**Primary demo narrative:**  
“GAC already has a strong movement and network. Afriquity can help convert that network activity into measurable intelligence for funders, members, leadership, and operational teams.”

## 4. Target Users

### 4.1 Executive Leadership
Needs a fast overview of total reach, funding deployed, regional spread, project themes, and strategic progress.

### 4.2 Program / Partnerships Team
Needs to track CBO engagement, member activity, project types, support needs, implementation status, and regional coordination.

### 4.3 Grants / Finance Team
Needs visibility over grants awarded, loans disbursed, repayments, outstanding balances, risk flags, and utilization.

### 4.4 Advocacy / Communications Team
Needs credible stories, impact numbers, geographic reach, and campaign-ready evidence.

### 4.5 Funders / Donors
Needs high-level transparency: where resources went, who was reached, what changed, and what remains underfunded.

## 5. Design Principles

### 5.1 Executive First
The first screen must answer: “What is happening across the GAC network right now?”

### 5.2 Local Leadership Visible
Avoid making communities look like passive beneficiaries. Show CBOs, regions, member organizations, proximate leaders, and locally led initiatives as active drivers of impact.

### 5.3 Explainable Metrics
Every KPI should have a plain-language definition, calculation logic, period, and last-updated timestamp.

### 5.4 Light but Serious
The dashboard should feel premium and institutional, not playful. Use restraint, clean cards, strong whitespace, and careful typography.

### 5.5 Demo Realism
The demo can use simulated data, but the flows and metrics must feel close to a production system.

## 6. Design System & Visual Language

### 6.1 Mood
- Premium civic-tech: an executive impact-intelligence product, not an NGO report.
- Calm, global, grassroots, credible — confident without being loud.
- Modern but not “startup flashy”.
- Reference feel: philanthropic impact reporting × financial portfolio intelligence × editorial data journalism.

### 6.2 Design Themes — The Premium Pillars

These seven pillars define what “premium” means for this product. Every screen should honor them.

1. **Warm institutional.** The canvas is a warm cream, not cold SaaS gray. Depth comes from ink and royal purple, never from pure black. The result reads as established, human, and trustworthy.
2. **Earned gold.** Gold (`#F5A800`) is the GAC signature and is *rationed*. It marks the single most important thing in a view — a hero metric, the primary CTA, the active data series — and nothing else. The restraint is what makes it feel premium.
3. **Royal depth.** Deep purple-to-ink gradients carry structure (sidebar, headers, hero panels) and give the product gravitas and a sense of institution.
4. **Layered calm.** Soft, ink-tinted elevation; hairline borders; generous whitespace. Information sits on quiet, well-separated planes instead of competing for attention.
5. **Tabular precision.** All figures use tabular numerals with consistent formatting and right-aligned columns. Financial-grade typesetting signals that the data can be trusted.
6. **Evidence over decoration.** High data-ink ratio. Charts are clean, labeled, and muted — no 3-D pies, no gradients-for-their-own-sake inside data marks.
7. **Quiet motion.** Transitions are short, purposeful, and physical (subtle lifts, count-ups, chart draw-ins). Motion guides the eye; it never performs.

### 6.3 Layout Style
- Persistent left sidebar navigation on a deep twilight (ink→purple) surface.
- Top bar: organization mark, page title, reporting-period selector, region filter, search, and a gold primary “Generate Report” action.
- Card-based main canvas on a 12-column grid (max content width ~1440px, 24px gutters).
- Large KPI tiles in the top row; portfolio and trend charts mid-fold; map and tables below.
- One accent per view. Avoid clutter and color noise.

### 6.4 Color System

GAC’s brand is **gold + royal purple over a warm canvas**. The system uses **purple as the structural / interactive primary** (legible, institutional) and **gold as the rationed accent** (energy, emphasis). This split is deliberate — it satisfies “one primary accent,” keeps the UI calm, and stays unmistakably GAC.

#### 6.4.1 Brand Ramps

**Gold — accent / “the spark”**
| Step | Hex | Use |
|---|---|---|
| gold-50 | `#FEF9EC` | Tint backgrounds, gold chip fill |
| gold-100 | `#FCEFCB` | Hover tint, sparkline fill base |
| gold-200 | `#F9E08F` | Chart fills, borders on tint |
| gold-300 | `#F7CE5B` | — |
| gold-400 | `#F6BB2E` | Hover on gold |
| **gold-500** | **`#F5A800`** | **Brand gold — accent, active series, CTA** |
| gold-600 | `#D98E00` | Gold pressed |
| gold-700 | `#C77A00` | `orangeDark` — gradient end, gold text on light\* |
| gold-800 | `#9E5F06` | — |
| gold-900 | `#7E4D0E` | Deep gold text |
| gold-950 | `#492A04` | — |

\* Gold is a **fill / stroke** color. On light surfaces use gold-700+ for text at large sizes only; never gold-500 as body text (insufficient contrast — see §6.10).

**Purple — structural / interactive primary**
| Step | Hex | Use |
|---|---|---|
| purple-50 | `#F4F0FA` | Active-nav tint, selected rows |
| purple-100 | `#E9E0F4` | Hover tint, focus halo |
| purple-200 | `#D5C4EA` | Borders on tint |
| purple-300 | `#B89BD9` | Dark-mode chart series |
| purple-400 | `#9A6FC5` | — |
| purple-500 | `#8652A1` | `purpleSoft` — secondary fills, chart series |
| purple-600 | `#6E3E91` | Hover on primary |
| purple-700 | `#5A2E87` | Links, pressed primary, focus ring |
| **purple-800** | **`#4B2383`** | **Brand purple — primary buttons, active nav, accents** |
| purple-900 | `#3A1C66` | Sidebar gradient (mid) |
| purple-950 | `#241043` | Sidebar gradient (deep) |

**Ink** `#070816` — the darkest plane: sidebar base, dark-mode canvas, deepest text, and the tint for all shadows.

#### 6.4.2 Warm Neutrals (Sand)
Built warm, not gray, to hold the institutional warmth.
| Token | Hex | Use |
|---|---|---|
| sand-50 | `#FAF8F3` | Raised neutral |
| **canvas / background** | `#F8F5EF` | App background |
| sand-100 | `#F2ECE1` | Sunken wells, table headers, hover |
| **muted** | `#EFE8DD` | Secondary panels, skeletons |
| **border** | `#DDD4C7` | Hairlines, dividers |
| sand-400 | `#C4B8A6` | Strong border, disabled text |
| **text-secondary** | `#62596B` | Labels, captions (a purple-gray that ties to brand) |
| **text** | `#171421` | Primary text |
| surface | `#FFFFFF` | Cards, popovers |

#### 6.4.3 Semantic Colors
Each role has a base (fill / icon), a foreground (accessible text on tint), and a soft tint (chip / banner background).
| Role | Base | Foreground | Soft tint | Use |
|---|---|---|---|---|
| Success | `#2F7D5C` | `#1E5B41` | `#E5F0EA` | Repaid, completed, on-track, positive delta |
| Warning | `#B7791F` | `#8A5A12` | `#F6ECD8` | At risk, due soon, attention |
| Danger | `#A33A3A` | `#7E2A2A` | `#F4E1E1` | Overdue, critical, negative delta |
| Info | `#315B7D` | `#244763` | `#E1EAF1` | New, informational, neutral notices |

> Status is **never** signaled by color alone — always pair with an icon and/or label (see §6.10). Delta colors follow *meaning*, not sign: a rising “Outstanding Balance” is danger-red, not success-green.

#### 6.4.4 Surfaces & Elevation Planes
| Plane | Color | Shadow | Use |
|---|---|---|---|
| Canvas | `#F8F5EF` | none | App background |
| Sunken | `#F2ECE1` | inset hairline | Table headers, wells, inactive tabs |
| Surface | `#FFFFFF` | shadow-sm | Cards, KPI tiles |
| Raised | `#FFFFFF` | shadow-md | Hover cards, menus, drawers |
| Overlay | `#FFFFFF` | shadow-lg | Dialogs, popovers, command palette |
| Sidebar | ink→purple gradient | — | Primary navigation |

#### 6.4.5 Gradients (Premium Signatures)
Use sparingly, only on structure / brand surfaces — never inside data marks.
- **Sidebar / Twilight:** `linear-gradient(180deg, #241043 0%, #070816 100%)` (deep purple → ink).
- **Gold CTA / Spark:** `linear-gradient(135deg, #F5A800 0%, #C77A00 100%)` — primary report action, hero KPI underline.
- **Royal hero panel:** `linear-gradient(135deg, #4B2383 0%, #8652A1 100%)` — executive narrative band, donor-view header.
- **Card sheen (optional):** `linear-gradient(180deg, #FFFFFF 0%, #FDFBF7 100%)` for hero cards.
- **Sparkline / area fill:** vertical fade of the series color from ~14% to 0% opacity.

#### 6.4.6 Data-Visualization Palette
A muted, brand-derived qualitative scale. Single-series charts use one color; reserve the full scale for categorical breakdowns (e.g., the 7–10 project themes).

Categorical order (chart-1…10):
`#4B2383` purple · `#F5A800` gold · `#2F7D5C` forest · `#315B7D` slate-blue · `#8652A1` purpleSoft · `#C77A00` orangeDark · `#9A6450` clay · `#5E7D5A` sage · `#7E2A55` plum · `#A98A5B` sand-dark.

- **Sequential** (intensity / heat — e.g., funding by region): gold-100 → gold-700, or purple-100 → purple-800.
- **Diverging** (repayment health): danger `#A33A3A` ↔ neutral `#EFE8DD` ↔ success `#2F7D5C`.
- **Disbursement vs Repayment trend:** disbursement = gold-500, repayment = purple-800, net outstanding = ink dashed.
- Grid lines `#EFE8DD`, axis labels `#62596B`, tooltips on a surface card with shadow-lg.

### 6.5 Typography

**Families** — `--font-sans` & `--font-heading`: Inter; `--font-mono`: Geist Mono (per coss). Tabular numerals on globally for figure alignment. *Optional premium upgrade:* a high-contrast display serif (e.g. **Fraunces**) for hero numbers and section eyebrows — keep Inter as the default.

```css
font-feature-settings: "tnum" 1, "cv05" 1; /* tabular figures + open 4 */
```

**Scale**
| Token | Size / Line | Weight | Tracking | Use |
|---|---|---|---|---|
| Display | 44 / 48 | 700 | -0.02em | Hero / donor-view headline number |
| KPI value | 30 / 36 | 650 | -0.01em | Metric-card values (tnum) |
| H1 | 28 / 34 | 600 | -0.01em | Page title |
| H2 | 20 / 28 | 600 | -0.005em | Section / chart-card title |
| H3 | 15 / 22 | 600 | 0 | KPI title, table caption |
| Body | 14 / 22 | 400 | 0 | Default text |
| Body-strong | 14 / 22 | 550 | 0 | Emphasis, key table cells |
| Eyebrow | 12 / 16 | 600 | 0.08em UPPER | Card labels, group headers |
| Caption | 12 / 16 | 400 | 0 | Tooltips, helper text, timestamps |
| Number-sm | 13 / 18 | 500 | 0 | Table figures (tnum, right-aligned) |

### 6.6 Spacing, Grid & Radius
- **Base unit:** 4px. Scale: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64.
- **Page padding:** 24px (mobile) → 32px (desktop). Max content width ~1440px.
- **Grid:** 12 columns, 24px gutters. KPI row: 6-up desktop → 3-up tablet → 2-up mobile. Charts: 2-up desktop → 1-up below 1024px.
- **Radius scale:** chips / pills full · inputs & buttons 10px · cards & KPIs 16px · modals & drawers 20px. (`--radius` = 0.75rem drives the coss `sm…3xl` ladder.)
- **Card:** radius 16px, padding 20–24px.
- **Min-heights:** KPI card 128px · chart card 320px · map 420px.
- **Density:** comfortable — this is a pitch demo, not a back-office ledger.

### 6.7 Elevation & Shadow
Ink-tinted (warm), never pure black, for a soft premium feel.
```css
--shadow-xs: 0 1px 2px rgba(7,8,22,.04);
--shadow-sm: 0 1px 3px rgba(7,8,22,.06), 0 1px 2px rgba(7,8,22,.04);
--shadow-md: 0 4px 12px -2px rgba(7,8,22,.08), 0 2px 6px -2px rgba(7,8,22,.05);
--shadow-lg: 0 12px 32px -8px rgba(7,8,22,.16);
--shadow-gold: 0 6px 20px -6px rgba(245,168,0,.45); /* CTA hover glow */
```

### 6.8 Motion
- **Durations:** 120ms micro (hover / press) · 200ms default · 320ms overlays.
- **Easing:** entrance `cubic-bezier(.2,0,0,1)`; standard ease-out.
- **Patterns:** card hover lift `translateY(-1px)` + shadow-md (160ms); KPI count-up on load; chart draw-in ~600ms; drawer / sheet slide 320ms.
- Honor `prefers-reduced-motion` — disable count-ups, lifts, and draw-ins.

### 6.9 Iconography
- Library: **lucide-react** (installed). Stroke 1.5px, size 18–20px (16px inline).
- Default `text-secondary`; brand color when active / selected; semantic color for status.

### 6.10 Accessibility & Contrast
- Targets WCAG 2.1 **AA** (text ≥ 4.5:1; large text / UI ≥ 3:1).
- `text` `#171421` on canvas `#F8F5EF` ≈ **16:1** (AAA). `text-secondary` `#62596B` on canvas ≈ **6:1** (AA).
- White on purple-800 `#4B2383` ≈ **11:1** (AAA) — primary buttons & links are comfortable. Ink on gold-500 ≈ **8:1** — gold buttons use dark (`#2A1D00`) text.
- **Gold is fill-only on light surfaces.** Gold-500 as text on white ≈ **2:1** (fails) — never use it for text; for gold text use gold-700+ at ≥ 18px.
- Visible focus ring: 2px purple-700 + 2px canvas offset on every interactive element.
- Never rely on color alone for status; pair with icon + label. Charts carry direct labels and accessible summaries.

### 6.11 Design Tokens — `globals.css`
Paste-ready mapping onto the existing coss / shadcn token contract (light = default; dark = the “Ink” executive theme). Brand ramps go under `@theme` so `bg-gold-500`, `text-purple-800`, etc. become utilities. This **replaces** the current neutral `:root`; keep the coss extra tokens (`--info/-foreground`, `--success/-foreground`, `--warning/-foreground`, `--destructive-foreground`) — components depend on them.

```css
:root {
  --radius: 0.75rem;

  /* Canvas & text (warm) */
  --background: #F8F5EF;
  --foreground: #171421;
  --card: #FFFFFF;            --card-foreground: #171421;
  --popover: #FFFFFF;         --popover-foreground: #171421;

  /* Primary = royal purple. NOTE: --accent stays a warm neutral because coss
     uses it for ghost-button / menu / item hovers — setting it to gold would
     turn every hover gold. The brand gold is the gold-* ramp (bg-gold-500). */
  --primary: #4B2383;         --primary-foreground: #FFFFFF;
  --secondary: #EFE8DD;       --secondary-foreground: #171421;
  --accent: #EFE8DD;          --accent-foreground: #171421;  /* subtle warm hover */
  --muted: #EFE8DD;           --muted-foreground: #62596B;

  --border: #DDD4C7;
  --input: #DDD4C7;
  --ring: #5A2E87;            /* purple-700 focus */

  /* Semantics: base / foreground */
  --destructive: #A33A3A;     --destructive-foreground: #7E2A2A;
  --warning: #B7791F;         --warning-foreground: #8A5A12;
  --success: #2F7D5C;         --success-foreground: #1E5B41;
  --info: #315B7D;            --info-foreground: #244763;

  /* Data viz */
  --chart-1: #4B2383; --chart-2: #F5A800; --chart-3: #2F7D5C;
  --chart-4: #315B7D; --chart-5: #8652A1; --chart-6: #C77A00;

  /* Sidebar — twilight (gradient applied in layout; this is the solid fallback) */
  --sidebar: #0E0B22;
  --sidebar-foreground: #C9C3D6;
  --sidebar-primary: #F5A800;             /* active accent */
  --sidebar-primary-foreground: #2A1D00;
  --sidebar-accent: rgba(255,255,255,.06);
  --sidebar-accent-foreground: #FFFFFF;
  --sidebar-border: rgba(255,255,255,.08);
  --sidebar-ring: #8652A1;
}

.dark {
  --background: #070816;       --foreground: #F3F1EC;
  --card: #12132A;             --card-foreground: #F3F1EC;
  --popover: #12132A;          --popover-foreground: #F3F1EC;
  --primary: #F5A800;          --primary-foreground: #241043;  /* gold leads on dark */
  --secondary: rgba(255,255,255,.06); --secondary-foreground: #F3F1EC;
  --accent: rgba(255,255,255,.06); --accent-foreground: #F3F1EC;
  --muted: rgba(255,255,255,.06);     --muted-foreground: #A39DB5;
  --border: rgba(255,255,255,.10);    --input: rgba(255,255,255,.14);
  --ring: #8652A1;
  --destructive: #D26666;      --destructive-foreground: #F4C9C9;
  --warning: #D9A441;          --warning-foreground: #F3E2C2;
  --success: #5FB48C;          --success-foreground: #CBEBDB;
  --info: #6F9DC0;             --info-foreground: #CFE0EE;
  --chart-1: #B89BD9; --chart-2: #F5A800; --chart-3: #5FB48C;
  --chart-4: #6F9DC0; --chart-5: #8652A1; --chart-6: #F6BB2E;
  --sidebar: #05060F;
  --sidebar-foreground: #C9C3D6;
  --sidebar-primary: #F5A800;  --sidebar-primary-foreground: #241043;
  --sidebar-accent: rgba(255,255,255,.06);
  --sidebar-accent-foreground: #FFFFFF;
  --sidebar-border: rgba(255,255,255,.08);
  --sidebar-ring: #8652A1;
}

/* Brand ramps + premium utilities (extends the existing @theme inline block) */
@theme inline {
  --color-gold-50:#FEF9EC;  --color-gold-100:#FCEFCB; --color-gold-200:#F9E08F;
  --color-gold-300:#F7CE5B; --color-gold-400:#F6BB2E; --color-gold-500:#F5A800;
  --color-gold-600:#D98E00; --color-gold-700:#C77A00; --color-gold-800:#9E5F06;
  --color-gold-900:#7E4D0E; --color-gold-950:#492A04;
  --color-purple-50:#F4F0FA;  --color-purple-100:#E9E0F4; --color-purple-200:#D5C4EA;
  --color-purple-300:#B89BD9; --color-purple-400:#9A6FC5; --color-purple-500:#8652A1;
  --color-purple-600:#6E3E91; --color-purple-700:#5A2E87; --color-purple-800:#4B2383;
  --color-purple-900:#3A1C66; --color-purple-950:#241043;
  --color-ink:#070816;
  --color-chart-6: var(--chart-6);
  --shadow-gold: 0 6px 20px -6px rgba(245,168,0,.45);
}
```

> Implementing this re-skins the whole app to the GAC brand. The sidebar gradient (§6.4.5) is applied as a `background-image` on the sidebar container in `layout.tsx` / the sidebar component, with `--sidebar` as the solid fallback.

## 7. Navigation Structure

### 7.1 Sidebar Items

1. **Overview**
2. **Network**
3. **Projects**
4. **Funding**
5. **Loans**
6. **Impact**
7. **Regions**
8. **Reports**
9. **Data Quality**

For a demo, build at least:

- Overview
- Network
- Projects
- Funding & Loans
- Impact Map
- Reports

## 8. Dashboard Pages

## 8.1 Overview Page

### Purpose
Provide an executive summary of GAC’s current network health, community reach, funding deployment, and project activity.

### Top Filters
- Reporting period: This quarter, YTD, Last 12 months, Custom.
- Region: Global, Africa, Asia, Latin America, Country.
- Project type.
- Funding type: Grant, Loan, In-kind, Technical support.
- Member status: Active, New, Dormant, At risk.

### Primary KPI Cards

Use the attached KPIs but refine labels for clarity.

| KPI | Better Label | Definition |
|---|---|---|
| No. of CBOs engaged | Active CBOs Engaged | Count of CBOs with at least one active project, event, grant, loan, training, or reporting activity in the period. |
| No. of people impacted | People Reached | Estimated direct and indirect people reached by GAC-supported initiatives. |
| Project Types | Project Portfolio Mix | Distribution of active projects by theme. |
| Total Amount Granted | Grants Awarded | Total grant funding approved or disbursed in the period. |
| Total Loans | Loans Disbursed | Total loan value disbursed to CBOs or member initiatives. |
| Total Loans Repaid | Loan Repayments Received | Total repayments received in the period. |
| Loans outstanding | Outstanding Loan Balance | Total principal and expected repayments still open. |

### Additional Recommended KPIs

| KPI | Reason |
|---|---|
| Active Countries / Regions | Shows GAC’s global footprint. |
| Member Organizations | Separates total network size from actively engaged CBOs. |
| New Members This Period | Shows growth momentum. |
| Projects Completed | Demonstrates execution. |
| Projects At Risk | Creates operational relevance. |
| Funding Gap | Useful for donor conversations. |
| Repayment Rate | Makes the loan component credible. |
| Women / Youth Reached | Relevant for many community development and donor reports. |
| Advocacy Outputs | Shows voice amplification: campaigns, policy briefs, forums, media mentions. |
| Capacity Building Sessions | Shows non-financial support value. |

### Suggested Overview Layout

#### Row 1 — Executive KPIs
- Active CBOs Engaged
- People Reached
- Grants Awarded
- Loans Outstanding
- Countries Active
- Repayment Rate

#### Row 2 — Portfolio Intelligence
- Project Portfolio Mix donut / stacked bar.
- Funding by Project Theme bar chart.
- Monthly Disbursement and Repayment trend line.

#### Row 3 — Geographic Intelligence
- Map of member organizations / projects.
- Regional performance table.

#### Row 4 — Operational Alerts
- Projects at risk.
- Reports overdue.
- Loans due in 30 days.
- Regions with low activity.
- Funding gaps by project type.

## 8.2 Network Page

### Purpose
Track the membership and CBO ecosystem.

### KPIs
- Total Member Organizations.
- Active CBOs.
- New Members.
- Dormant Members.
- Countries Represented.
- Average Engagement Score.

### Main Components
- Member directory table.
- Map of member locations.
- Engagement score ranking.
- Member organization profile drawer.

### Table Columns
- Organization name.
- Country.
- Region.
- Focus area.
- Member since.
- Active projects.
- Last activity date.
- Engagement score.
- Support need.
- Status.

### Engagement Score Logic
A simple demo score can combine:

- Reporting activity.
- Event participation.
- Active projects.
- Funding utilization.
- Training attendance.
- Advocacy participation.

## 8.3 Projects Page

### Purpose
Show GAC’s portfolio of community-led projects.

### Project Types
Use themes aligned to GAC content and common grassroots work:

- Climate action.
- Food security.
- Youth skills and employment.
- Gender equality.
- Health and wellbeing.
- Education.
- Economic empowerment.
- Advocacy and civic participation.
- Organizational capacity building.
- Emergency / crisis response.

### KPIs
- Active Projects.
- Completed Projects.
- Projects At Risk.
- Average Project Completion.
- People Reached.
- Funding Utilization.

### Components
- Project status board.
- Project type distribution.
- Project timeline.
- Implementation progress table.
- Risk register.

### Project Table Columns
- Project name.
- CBO / member organization.
- Country.
- Theme.
- Start date.
- End date.
- Budget.
- Funds disbursed.
- Completion.
- Status.
- Risk level.

## 8.4 Funding & Loans Page

### Purpose
Track grants, loans, repayments, outstanding balances, and funding gaps.

### Grants KPIs
- Total Grants Awarded.
- Total Grants Disbursed.
- Average Grant Size.
- Number of Grant Recipients.
- Funding Gap.
- Grant Utilization Rate.

### Loan KPIs
- Loans Disbursed.
- Loan Repayments Received.
- Outstanding Loan Balance.
- Repayment Rate.
- Loans Due Soon.
- Overdue Loans.

### Visuals
- Grants by theme.
- Grants by region.
- Loan portfolio trend.
- Repayment aging.
- Funding pipeline.

### Loan Aging Buckets
- Current.
- Due in 30 days.
- 1–30 days overdue.
- 31–60 days overdue.
- 61–90 days overdue.
- 90+ days overdue.

## 8.5 Impact Page

### Purpose
Translate activity into outcomes.

### KPIs
- People Reached.
- Households Reached.
- Youth Reached.
- Women / Girls Reached.
- Jobs / Livelihoods Supported.
- Community Leaders Supported.
- Advocacy Outputs.
- Capacity Sessions Delivered.

### Impact Views
- By geography.
- By project theme.
- By population group.
- By funding source.
- By member organization.

### Qualitative Layer
Include story cards:
- Member spotlight.
- Community voice.
- Project outcome summary.
- Before / after evidence.
- Photo placeholder.

This matters because GAC’s work is not purely transactional; it is about power, voice, local leadership, and systemic change.

## 8.6 Regions Page

### Purpose
Show GAC’s geographic footprint and let teams compare regional and country performance — reach, funding, projects, and risk — to surface where the network is strong and where it is underfunded. This is the page that makes “locally led, cross-country coordination” tangible.

### KPIs
- Active Countries.
- Active Regions.
- Top Region by People Reached.
- Top Region by Funding Deployed.
- Most Underfunded Region (largest funding gap).
- Regional Coverage (share of regions with active projects).

### Main Components
- Interactive map: bubbles sized by people reached or funds deployed; colored by activity level or repayment health.
- Regional performance table.
- Regional comparison bars (reach, funding, gap), sortable by metric.
- Region detail drawer: country list, active CBOs, projects, funding, impact, and gap.
- “Underfunded regions” insight card for donor conversations.

### Regional Table Columns
- Region.
- Countries active.
- Member organizations.
- Active CBOs.
- Active projects.
- People reached.
- Funds deployed (USD).
- Funding gap (USD).
- Repayment rate.
- Activity trend (sparkline).

### Suggested Regions
East Africa, West Africa, Southern Africa, South Asia, Latin America (per PRD §15.2). Use clearly simulated figures.

## 8.7 Reports Page

### Purpose
Show how GAC can generate donor-ready and board-ready reports.

### Report Types
- Executive Impact Summary.
- Donor Funding Report.
- Regional Performance Report.
- Project Portfolio Report.
- Loan Portfolio Report.
- Member Engagement Report.
- Data Quality Report.

### Features
- Export PDF.
- Export CSV.
- Filtered report builder.
- Scheduled email reports.
- Narrative summary generated from dashboard data.

## 8.8 Data Quality Page

### Purpose
Demonstrate that Afriquity understands reliability, not just visualization.

### KPIs
- Reporting Completeness.
- Records Missing Location.
- Records Missing Beneficiary Counts.
- Duplicate Organizations.
- Overdue Reports.
- Last Sync Time.

### Components
- Data quality score.
- Missing fields table.
- Duplicate detection.
- Recent uploads / sync logs.
- Validation rules.

## 9. Demo Data Model

Use simulated data that feels realistic.

### 9.1 Entities

#### Organization / CBO
```ts
type Organization = {
  id: string;
  name: string;
  country: string;
  region: string;
  county_or_state?: string;
  focus_areas: string[];
  member_since: string;
  status: "active" | "new" | "dormant" | "at_risk";
  engagement_score: number;
  contact_person: string;
};
```

#### Project
```ts
type Project = {
  id: string;
  name: string;
  organization_id: string;
  country: string;
  region: string;
  theme: string;
  start_date: string;
  end_date: string;
  budget_usd: number;
  disbursed_usd: number;
  completion_pct: number;
  people_reached: number;
  status: "planned" | "active" | "completed" | "at_risk";
  risk_level: "low" | "medium" | "high";
};
```

#### Grant
```ts
type Grant = {
  id: string;
  organization_id: string;
  project_id: string;
  amount_approved_usd: number;
  amount_disbursed_usd: number;
  funding_source: string;
  approval_date: string;
  disbursement_date: string;
  utilization_pct: number;
  status: "approved" | "disbursed" | "closed";
};
```

#### Loan
```ts
type Loan = {
  id: string;
  organization_id: string;
  project_id?: string;
  principal_usd: number;
  disbursed_date: string;
  due_date: string;
  amount_repaid_usd: number;
  outstanding_usd: number;
  repayment_status: "current" | "due_soon" | "overdue" | "closed";
};
```

#### Impact Metric
```ts
type ImpactMetric = {
  id: string;
  project_id: string;
  period: string;
  people_reached: number;
  households_reached: number;
  women_reached: number;
  youth_reached: number;
  jobs_supported: number;
  leaders_supported: number;
};
```

## 10. Recommended Demo Seed Numbers

Use believable demo figures. Avoid exaggerated vanity numbers.

### Global Summary
- Member organizations: 186
- Active CBOs engaged: 74
- Countries represented: 18
- Active countries this period: 9
- Active projects: 42
- People reached: 128,450
- Grants awarded: USD 1.84M
- Loans disbursed: USD 620K
- Loan repayments received: USD 392K
- Outstanding loan balance: USD 228K
- Repayment rate: 63.2%
- Projects at risk: 6
- Reports overdue: 11
- Funding gap: USD 740K

### Project Mix
- Climate action: 24%
- Youth skills and employment: 18%
- Food security: 16%
- Gender equality: 14%
- Health and wellbeing: 12%
- Economic empowerment: 9%
- Advocacy and civic participation: 7%

## 11. Key Charts

### 11.1 KPI Cards
Each card should include:
- Label.
- Value.
- Period comparison.
- Tiny sparkline or status chip.
- Tooltip definition.

Example:
**Active CBOs Engaged**  
74  
+12% vs last quarter  
Tooltip: “CBOs with at least one recorded activity in the selected period.”

### 11.2 Project Portfolio Mix
Best visualization:
- Horizontal stacked bar or donut chart.
- Avoid too many colors.
- Use muted palette with one primary accent.

### 11.3 Funding by Region
Best visualization:
- Horizontal bar chart.
- Sort descending.
- Include total and percentage.

### 11.4 Disbursement vs Repayment Trend
Best visualization:
- Two-line chart.
- Monthly granularity.
- Show net outstanding balance as small secondary annotation.

### 11.5 Impact Map
Best visualization:
- Map with bubbles by people reached or active projects.
- Tooltip: country, active CBOs, projects, people reached, funds deployed.

### 11.6 Loan Aging
Best visualization:
- Stacked bar or aging table.
- Strong status chips: current, due soon, overdue.

## 12. Components

### 12.1 MetricCard
Props:
- title
- value
- format
- delta
- deltaLabel
- status
- tooltip
- sparklineData

### 12.2 ChartCard
Props:
- title
- subtitle
- chart
- legend
- footerInsight

### 12.3 FilterBar
Props:
- period
- region
- projectType
- fundingType
- memberStatus

### 12.4 DataTable
Required:
- Search.
- Sort.
- Filter.
- Pagination.
- Row click opens details drawer.
- Empty state.
- Export CSV.

### 12.5 StatusChip
Statuses:
- Active.
- Completed.
- At risk.
- Overdue.
- Current.
- Due soon.
- Dormant.
- New.

### 12.6 InsightCard
Use for narrative insights:
- “Climate action projects account for 24% of the portfolio but 38% of the current funding gap.”
- “Six projects are at risk, mostly due to delayed field reports.”
- “Loan repayment performance is strongest among economic empowerment projects.”

## 13. Page-Level Wireframe

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Sidebar       │ Topbar: GAC Impact Intelligence | Period | Region | Export │
│               ├────────────────────────────────────────────────────────────┤
│ Overview      │ KPI 1     KPI 2     KPI 3     KPI 4     KPI 5     KPI 6    │
│ Network       ├───────────────────────────────┬────────────────────────────┤
│ Projects      │ Project Portfolio Mix          │ Funding + Loan Trend       │
│ Funding       │                               │                            │
│ Loans         ├───────────────────────────────┴────────────────────────────┤
│ Impact        │ Impact Map + Regional Summary Table                         │
│ Regions       ├───────────────────────────────┬────────────────────────────┤
│ Reports       │ Operational Alerts             │ Recent Member Spotlights   │
│ Data Quality  │                               │                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## 14. Microcopy

Use precise labels.

Avoid:
- “Beneficiaries” as the only impact framing.
- “Charity”.
- “Aid recipients”.
- “Poor communities”.

Prefer:
- “People reached”.
- “Community members reached”.
- “Member organizations”.
- “Community-led projects”.
- “Grassroots leaders”.
- “Local implementation partners”.
- “Resources mobilized”.

## 15. Pitch-Specific Demo Features

Include a few features that make Afriquity look strong:

### 15.1 Executive Narrative Summary
A generated text block summarizing the selected reporting period.

Example:
> This quarter, GAC engaged 74 active CBOs across 9 countries, reaching an estimated 128,450 people. Climate action and youth employment were the largest active project areas. Loan repayment performance remained stable at 63.2%, while 6 projects require follow-up due to delayed reporting or funding gaps.

### 15.2 Donor Transparency View
A simplified view showing:
- Funds received.
- Funds disbursed.
- Communities reached.
- Project outcomes.
- Funding gap.

### 15.3 Member Organization Profile
Clicking an organization opens:
- Basic profile.
- Projects.
- Funding received.
- Impact metrics.
- Reporting status.
- Support needs.
- Documents.

### 15.4 Data Quality Score
Shows that the system can be trusted.

### 15.5 Report Export
Use a visible “Generate Board Report” button.

## 16. Avoid These Mistakes

- Do not make it look like a banking dashboard only.
- Do not over-index on loans; GAC’s broader mission is locally led development.
- Do not show too many charts on the first screen.
- Do not use random bright colors.
- Do not create fake precision such as exact people impacted without showing estimates / definitions.
- Do not bury the map; geographic footprint is important.
- Do not make the demo too operational and lose executive appeal.

## 17. Acceptance Criteria for Design

The demo is successful when:

- A GAC executive can understand the value in under 60 seconds.
- The dashboard clearly connects Afriquity to GAC’s mission.
- The KPIs are not generic; they reflect grassroots networks, funding, projects, and community impact.
- The dashboard feels credible enough for donor reporting.
- There is a clear path from demo dashboard to production implementation.
- The UI feels premium, legible, restrained, and easy to navigate.
- The interface uses the GAC brand system: warm cream canvas, royal-purple structure, and a rationed gold accent — one accent per view.
- Color, type, spacing, elevation, and motion follow §6, and status is never conveyed by color alone.
- Design tokens map cleanly onto the coss/shadcn contract in `globals.css`, including the optional dark “Ink” executive theme, and meet WCAG AA contrast.
