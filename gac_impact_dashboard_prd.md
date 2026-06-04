# Product Requirements Document — GAC Impact Intelligence Dashboard Demo

## 1. Product Name

**GAC Impact Intelligence Dashboard**

## 2. Client

**Global Alliance for Communities (GAC)**

## 3. Vendor / Pitching Organization

**Afriquity**

## 4. Product Type

Demo dashboard / clickable prototype / frontend-first proof of concept.

## 5. Objective

Create a high-quality demo dashboard that shows how Afriquity can help GAC monitor, understand, and communicate the performance of its community-based organization network, project portfolio, grant funding, loan support, and community impact.

The demo is not a full production build. It should simulate the likely production experience with believable mock data and realistic user flows.

## 6. Background

GAC is a coalition of grassroots community-based organizations working across underserved populations in the Global South. Its mission is linked to grassroots leadership, advocacy, research, resource mobilization, and equitable funding.

The proposed dashboard should convert this mission into measurable operational intelligence.

The attached initial KPI list includes:

- Number of CBOs engaged.
- Number of people impacted.
- Project types.
- Total amount granted.
- Total loans.
- Total loans repaid.
- Loans outstanding.

These KPIs are valid, but they should be expanded to include membership, geography, impact outcomes, reporting quality, project status, and funding gaps.

## 7. Problem Statement

GAC likely needs a clearer way to answer the following questions:

1. Which member organizations and CBOs are active?
2. Which countries and regions are showing the strongest activity?
3. What types of projects are being implemented?
4. How much funding has been granted or loaned?
5. What is the repayment and outstanding balance position?
6. How many people and households are being reached?
7. Which projects are at risk?
8. Which members need technical support, funding, or follow-up?
9. How can GAC produce credible reports for funders, board members, and advocacy partners?

Without a unified dashboard, these answers are usually scattered across spreadsheets, reports, emails, field updates, payment records, and narrative documents.

## 8. Product Vision

A single source of truth for GAC’s community network, funding, loan portfolio, project activity, and impact reporting.

## 9. Success Criteria

The demo should succeed if it can:

- Convince GAC that Afriquity understands its mission and operating model.
- Show a clear executive overview of network, funding, projects, and impact.
- Demonstrate practical use cases for program, finance, donor reporting, and advocacy teams.
- Use realistic mock data that feels relevant to GAC.
- Provide a clear foundation for a production system.

## 10. Non-Goals

For the demo phase, do not build:

- Full backend.
- Authentication / role-based access unless simulated.
- Real integrations.
- Real payment processing.
- Real loan servicing engine.
- Complex grant workflow approvals.
- Mobile app.
- Full CRM.
- Full M&E system.

The demo can show placeholders for future capability, but the scope should stay focused.

## 11. User Personas

### 11.1 Executive Director / Leadership
Needs:
- High-level network and impact summary.
- Donor-ready numbers.
- Regional footprint.
- Strategic funding gaps.
- Project risk overview.

Main question:
> Are we growing, reaching communities, mobilizing resources, and managing risk?

### 11.2 Programs / Partnerships Manager
Needs:
- CBO engagement.
- Active projects.
- Member needs.
- Project progress.
- Reporting status.

Main question:
> Which organizations need support and which projects require follow-up?

### 11.3 Finance / Grants Officer
Needs:
- Grants awarded.
- Disbursements.
- Loans issued.
- Repayments.
- Outstanding balances.
- Overdue loans.

Main question:
> Where is money going, what has been repaid, and what is outstanding?

### 11.4 Advocacy / Communications Lead
Needs:
- Impact stories.
- Regional evidence.
- People reached.
- Project themes.
- Community leadership proof points.

Main question:
> What can we confidently communicate to funders, partners, and the public?

### 11.5 Donor / Board Viewer
Needs:
- Simple, trusted, non-technical summary.
- Funds deployed.
- Impact achieved.
- Transparency and accountability.

Main question:
> Is GAC using resources effectively and producing measurable impact?

## 12. Key Use Cases

### Use Case 1: Executive Overview
A GAC leader opens the dashboard and immediately sees:

- Active CBOs engaged.
- People reached.
- Grants awarded.
- Loans outstanding.
- Active countries.
- Repayment rate.
- Projects at risk.
- Funding gap.

### Use Case 2: Understand Project Portfolio
A program manager filters by region and sees project distribution by theme, status, and risk level.

### Use Case 3: Track Funding and Loans
A finance user views grants and loans, including approved amounts, disbursed amounts, repayments, outstanding balances, and overdue items.

### Use Case 4: Prepare Donor Report
A user filters to a donor-funded program and exports a summary report showing funds disbursed, project outputs, people reached, and geographic coverage.

### Use Case 5: Identify Follow-Up Needs
A user opens the data quality or alerts section and sees missing reports, overdue loan repayments, and projects at risk.

## 13. Functional Requirements

## 13.1 Global Navigation

The application must include:

- Sidebar navigation.
- Top filter bar.
- Page title and summary.
- Reporting period selector.
- Region selector.
- Export button.

Priority: Must have.

## 13.2 Overview Dashboard

The Overview page must show:

- Active CBOs Engaged.
- People Reached.
- Grants Awarded.
- Loans Disbursed.
- Loan Repayments Received.
- Outstanding Loan Balance.
- Repayment Rate.
- Active Countries.
- Active Projects.
- Projects At Risk.
- Funding Gap.

Priority: Must have.

## 13.3 KPI Tooltips

Each KPI card must include a short definition.

Example:
“Active CBOs Engaged: CBOs with at least one recorded project, event, funding, training, or reporting activity during the selected period.”

Priority: Must have.

## 13.4 Filters

Users must be able to filter dashboard data by:

- Reporting period.
- Region.
- Country.
- Project type.
- Funding type.
- Member status.

Priority: Must have.

For demo purposes, filtering may update mock values client-side.

## 13.5 Network Module

The Network page must include:

- Member organization count.
- Active CBOs.
- Countries represented.
- Engagement score.
- Member table.
- Member profile drawer.

Priority: Should have.

## 13.6 Projects Module

The Projects page must include:

- Project list.
- Project status.
- Project theme.
- Completion percentage.
- Risk level.
- People reached.
- Funding utilization.

Priority: Must have.

## 13.7 Funding Module

The Funding page must include:

- Grants awarded.
- Grants disbursed.
- Funding by theme.
- Funding by region.
- Average grant size.
- Funding gap.

Priority: Must have.

## 13.8 Loans Module

The Loans page must include:

- Total loans disbursed.
- Loan repayments received.
- Outstanding balance.
- Repayment rate.
- Due soon.
- Overdue.
- Loan aging table.

Priority: Should have.

## 13.9 Impact Module

The Impact page must include:

- People reached.
- Households reached.
- Women reached.
- Youth reached.
- Jobs supported.
- Leaders supported.
- Impact by project type.
- Impact by geography.
- Story cards.

Priority: Should have.

## 13.10 Map View

The dashboard should include a map showing:

- Countries / regions of activity.
- Number of active CBOs.
- Active projects.
- People reached.
- Funds deployed.

Priority: Should have.

## 13.11 Report Generation Placeholder

The Reports page must include report cards for:

- Executive Impact Summary.
- Donor Funding Report.
- Regional Performance Report.
- Project Portfolio Report.
- Loan Portfolio Report.
- Member Engagement Report.

Each report card should have:

- Description.
- Filters.
- Generate button.
- Export PDF placeholder.

Priority: Should have.

## 13.12 Data Quality Module

The dashboard should show:

- Data completeness score.
- Missing beneficiary data.
- Missing location data.
- Duplicate organizations.
- Overdue reports.
- Last sync timestamp.

Priority: Could have, but strongly recommended for pitch credibility.

## 14. Non-Functional Requirements

### 14.1 Performance
The demo should load quickly and feel instant. Mock data should be bundled locally or generated client-side.

### 14.2 Responsiveness
The main target is desktop, but the dashboard should not break on tablets. Mobile optimization is secondary for the pitch.

### 14.3 Accessibility
- Text contrast must meet WCAG AA.
- Interactive elements must have visible focus states.
- Charts must have labels and accessible summaries.
- Do not rely only on color for status.

### 14.4 Usability
- Labels must be plain language.
- KPI definitions must be visible through tooltips or info icons.
- Navigation must be shallow.
- Avoid unnecessary workflows.

### 14.5 Visual Quality
- Premium and restrained.
- No childish colors.
- No overstuffed cards.
- No generic SaaS landing-page aesthetic.
- High legibility.

## 15. Data Requirements

## 15.1 Mock Data Scope

Create mock data for:

- 150–200 member organizations.
- 70–80 active CBOs.
- 40–50 active projects.
- 15–20 countries.
- 7–10 project themes.
- 60–100 grants.
- 30–50 loans.
- 12 months of trend data.
- Regional impact metrics.

## 15.2 Suggested Demo Regions

Use regions aligned to Global South activity:

- East Africa.
- West Africa.
- Southern Africa.
- South Asia.
- Latin America.

## 15.3 Suggested Countries

Include examples such as:

- Kenya.
- Uganda.
- Tanzania.
- Nigeria.
- Ghana.
- South Africa.
- India.
- Bangladesh.
- Brazil.
- Colombia.

Use clearly simulated data; do not claim these are real GAC operating figures unless verified.

## 16. KPI Definitions

| KPI | Definition | Formula |
|---|---|---|
| Active CBOs Engaged | CBOs with at least one qualifying activity in the selected period. | Count distinct CBO IDs where activity date is in period. |
| People Reached | Direct + estimated indirect reach across supported projects. | Sum project impact records. |
| Active Projects | Projects with status active in selected period. | Count projects where status = active. |
| Projects At Risk | Projects marked medium/high risk or delayed. | Count projects where risk level = high or status = at_risk. |
| Grants Awarded | Total approved grant value. | Sum approved grant amount. |
| Grants Disbursed | Total grant funds released. | Sum disbursed grant amount. |
| Loans Disbursed | Total loan principal disbursed. | Sum loan principal. |
| Loan Repayments Received | Total repayments received. | Sum repayments. |
| Outstanding Loan Balance | Loan principal and scheduled amount still unpaid. | Sum outstanding amount. |
| Repayment Rate | Portion of disbursed loans repaid. | Repaid / Disbursed. |
| Funding Gap | Estimated unfunded project need. | Required budget - committed funding. |
| Reporting Completeness | Share of expected reports submitted. | Submitted reports / expected reports. |

## 17. Suggested Screens

### Screen 1: Overview
Main executive dashboard.

### Screen 2: Network
Member and CBO engagement.

### Screen 3: Projects
Project portfolio and risk.

### Screen 4: Funding & Loans
Grant and loan tracking.

### Screen 5: Impact Map
Geographic footprint and impact outcomes.

### Screen 6: Reports
Report generation placeholders.

### Screen 7: Data Quality
Trust and completeness indicators.

## 18. MVP Scope for Demo

### Must Build
- Overview dashboard.
- KPI cards.
- Charts for project mix, funding by region, disbursement vs repayment.
- Map placeholder or interactive map.
- Projects table.
- Funding / loans table.
- Report export placeholders.
- Mock data.

### Should Build
- Network page.
- Member profile drawer.
- Data quality page.
- Insight summary card.

### Could Build
- Role switcher.
- AI-generated narrative summary placeholder.
- Donor view.
- CSV export.

## 19. User Stories

### Executive
As an executive, I want to see GAC’s network reach, funding deployment, and impact in one place so that I can brief funders and board members quickly.

Acceptance criteria:
- Overview loads with top KPIs.
- KPIs respond to period and region filters.
- User can export or generate a report placeholder.

### Program Manager
As a program manager, I want to see active projects by theme, region, status, and risk so that I can prioritize follow-up.

Acceptance criteria:
- Projects table supports filtering.
- At-risk projects are clearly marked.
- User can open project details.

### Finance Officer
As a finance officer, I want to track grants, loans, repayments, and outstanding balances so that I can understand funding performance.

Acceptance criteria:
- Funding and loan KPIs are visible.
- Loan aging is shown.
- Overdue items are clearly marked.

### Advocacy Lead
As an advocacy lead, I want to see impact by theme, geography, and story so that I can communicate GAC’s value clearly.

Acceptance criteria:
- Impact page includes people reached, project themes, and map.
- Story cards are available.
- Report page includes advocacy-friendly report types.

### Data Officer
As a data officer, I want to see missing data and reporting gaps so that I can improve dashboard reliability.

Acceptance criteria:
- Data quality page shows completeness score.
- Missing data table exists.
- Overdue reports are visible.

## 20. Demo Workflow

The pitch should follow this flow:

1. Open Overview.
2. Explain GAC’s total network, active CBOs, people reached, funding, and loans.
3. Filter to Africa or Kenya.
4. Show project portfolio mix.
5. Open Funding & Loans to show transparency.
6. Open Impact Map to show geographic reach.
7. Open Reports and show donor/board reporting potential.
8. End with Data Quality to demonstrate trust and production readiness.

## 21. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Demo looks too finance-heavy | Balance loans/grants with advocacy, membership, impact, and project views. |
| Numbers look fake | Use conservative, clearly simulated numbers. |
| Dashboard feels generic | Use GAC-specific language: grassroots, locally led, member organizations, community voice. |
| Too many features | Keep first demo focused on executive overview, portfolio, funding, impact, and reporting. |
| Client asks for production timeline | Present phased rollout: discovery, data model, MVP dashboard, integrations, reporting automation. |

## 22. Production Roadmap After Demo

### Phase 1: Discovery and Data Audit
- Confirm data sources.
- Define KPI dictionary.
- Map workflows.
- Identify required integrations.

### Phase 2: MVP Dashboard
- Build authenticated dashboard.
- Import data from spreadsheets or database.
- Create executive overview, projects, funding, and impact views.

### Phase 3: Workflow Modules
- Member management.
- Project reporting.
- Grant and loan tracking.
- Document uploads.
- Field reporting forms.

### Phase 4: Reporting and Automation
- Donor report generation.
- Scheduled reports.
- Alerts.
- Data quality checks.
- AI-assisted narrative summaries.

### Phase 5: Integrations
- Accounting system.
- CRM / membership database.
- Survey tools.
- Mobile data collection.
- Payment / disbursement records.

## 23. Open Questions for GAC

1. What countries and regions are currently active?
2. How many member organizations are in the network?
3. Does GAC directly issue grants, loans, or mainly mobilize resources through partners?
4. Are loans part of GAC’s current model, or is this a proposed Afriquity feature?
5. What are the main project categories GAC wants to report on?
6. What data is currently stored in spreadsheets?
7. What reports are required for funders or board meetings?
8. Are beneficiary counts verified, estimated, or self-reported by CBOs?
9. What level of public transparency is desired?
10. Which users should access the system?

## 24. Acceptance Criteria for Demo Delivery

The demo is complete when:

- The Overview page is functional with mock data.
- The dashboard includes GAC-relevant KPIs.
- At least three visualizations are present.
- Project, funding, and loan records are visible in tables.
- Filters work on mock data.
- Report generation placeholders exist.
- The interface is polished and presentation-ready.
- The product story clearly supports Afriquity’s pitch.
