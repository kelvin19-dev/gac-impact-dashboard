export type PeriodValue = "quarter" | "ytd" | "last12" | "custom";
export type RegionValue =
  | "Global"
  | "Nairobi Metro"
  | "Coast"
  | "Western Kenya"
  | "Nyanza"
  | "Rift Valley"
  | "Central Kenya"
  | "Lower Eastern"
  | "Northern Kenya";
export type FundingType = "All" | "Grant" | "Loan" | "In-kind" | "Technical support";
export type MemberStatus = "all" | "active" | "new" | "dormant" | "at_risk";
export type ProjectStatus = "planned" | "active" | "completed" | "at_risk";
export type RiskLevel = "low" | "medium" | "high";

export type CountryProfile = {
  country: string;
  region: Exclude<RegionValue, "Global">;
  lat: number;
  lon: number;
};

export type Organization = {
  id: string;
  name: string;
  country: string;
  region: Exclude<RegionValue, "Global">;
  countyOrState: string;
  focusAreas: string[];
  memberSince: string;
  status: Exclude<MemberStatus, "all">;
  engagementScore: number;
  contactPerson: string;
  supportNeed: string;
  lastActivityDate: string;
  reportingStatus: "current" | "due_soon" | "overdue";
};

export type Project = {
  id: string;
  name: string;
  organizationId: string;
  country: string;
  region: Exclude<RegionValue, "Global">;
  theme: string;
  startDate: string;
  endDate: string;
  budgetUsd: number;
  disbursedUsd: number;
  completionPct: number;
  peopleReached: number;
  status: ProjectStatus;
  riskLevel: RiskLevel;
};

export type Grant = {
  id: string;
  organizationId: string;
  projectId: string;
  amountApprovedUsd: number;
  amountDisbursedUsd: number;
  fundingSource: string;
  approvalDate: string;
  disbursementDate: string;
  utilizationPct: number;
  status: "approved" | "disbursed" | "closed";
};

export type Loan = {
  id: string;
  organizationId: string;
  projectId?: string;
  principalUsd: number;
  disbursedDate: string;
  dueDate: string;
  amountRepaidUsd: number;
  outstandingUsd: number;
  repaymentStatus: "current" | "due_soon" | "overdue" | "closed";
};

export type ImpactMetric = {
  id: string;
  projectId: string;
  period: string;
  peopleReached: number;
  householdsReached: number;
  womenReached: number;
  youthReached: number;
  jobsSupported: number;
  leadersSupported: number;
};

export type MonthlyTrend = {
  month: string;
  grants: number;
  loans: number;
  repayments: number;
  outstanding: number;
};

export type ImpactStory = {
  title: string;
  country: string;
  theme: string;
  summary: string;
  metric: string;
};

export type DataIssue = {
  record: string;
  owner: string;
  issue: string;
  severity: "low" | "medium" | "high";
  status: "open" | "in_review" | "resolved";
};

export type ReportTemplate = {
  title: string;
  audience: string;
  description: string;
  defaultFilters: string[];
  artifact: {
    format: "PPTX";
    href: string;
    fileName: string;
    sizeLabel: string;
    slideCount: number;
  };
};

export const asOfDate = "2026-05-31T12:00:00Z";

export const periodOptions: { label: string; value: PeriodValue }[] = [
  { label: "This quarter", value: "quarter" },
  { label: "YTD", value: "ytd" },
  { label: "Last 12 months", value: "last12" },
  { label: "Custom", value: "custom" },
];

export const regionOptions: RegionValue[] = [
  "Global",
  "Nairobi Metro",
  "Coast",
  "Western Kenya",
  "Nyanza",
  "Rift Valley",
  "Central Kenya",
  "Lower Eastern",
  "Northern Kenya",
];

export const fundingTypeOptions: FundingType[] = [
  "All",
  "Grant",
  "Loan",
  "In-kind",
  "Technical support",
];

export const memberStatusOptions: { label: string; value: MemberStatus }[] = [
  { label: "All members", value: "all" },
  { label: "Active", value: "active" },
  { label: "New", value: "new" },
  { label: "Dormant", value: "dormant" },
  { label: "At risk", value: "at_risk" },
];

export const projectThemes = [
  "Youth skills and livelihoods",
  "Women economic empowerment",
  "Climate resilience",
  "Food security",
  "Community health",
  "Education support",
  "Water and sanitation",
  "Peacebuilding and civic participation",
  "Digital inclusion",
  "Small enterprise support",
  "Community savings groups",
  "Local advocacy",
];

export const countryProfiles: CountryProfile[] = [
  { country: "Nairobi", region: "Nairobi Metro", lat: -1.286, lon: 36.817 },
  { country: "Mombasa", region: "Coast", lat: -4.043, lon: 39.668 },
  { country: "Kisumu", region: "Nyanza", lat: -0.092, lon: 34.768 },
  { country: "Nakuru", region: "Rift Valley", lat: -0.303, lon: 36.08 },
  { country: "Kiambu", region: "Central Kenya", lat: -1.171, lon: 36.835 },
  { country: "Machakos", region: "Lower Eastern", lat: -1.517, lon: 37.263 },
  { country: "Kajiado", region: "Nairobi Metro", lat: -1.852, lon: 36.776 },
  { country: "Turkana", region: "Northern Kenya", lat: 3.312, lon: 35.565 },
  { country: "Garissa", region: "Northern Kenya", lat: -0.456, lon: 39.646 },
  { country: "Kilifi", region: "Coast", lat: -3.633, lon: 39.85 },
  { country: "Kakamega", region: "Western Kenya", lat: 0.283, lon: 34.752 },
  { country: "Bungoma", region: "Western Kenya", lat: 0.569, lon: 34.56 },
  { country: "Meru", region: "Central Kenya", lat: 0.047, lon: 37.65 },
  { country: "Nyeri", region: "Central Kenya", lat: -0.42, lon: 36.95 },
  { country: "Uasin Gishu", region: "Rift Valley", lat: 0.514, lon: 35.27 },
  { country: "Homa Bay", region: "Nyanza", lat: -0.527, lon: 34.457 },
  { country: "Migori", region: "Nyanza", lat: -1.063, lon: 34.473 },
  { country: "Isiolo", region: "Northern Kenya", lat: 0.354, lon: 37.583 },
  { country: "Samburu", region: "Northern Kenya", lat: 1.215, lon: 36.954 },
  { country: "Taita Taveta", region: "Coast", lat: -3.399, lon: 38.363 },
  { country: "Makueni", region: "Lower Eastern", lat: -2.255, lon: 37.893 },
];

export const countyProfiles = countryProfiles;

const countyWards: Record<string, string[]> = {
  Nairobi: ["Kibera", "Mathare", "Mukuru", "Korogocho", "Dandora", "Kayole", "Kangemi", "Eastleigh"],
  Mombasa: ["Likoni", "Kisauni", "Changamwe", "Tudor", "Kongowea", "Mtwapa Road"],
  Kisumu: ["Nyalenda", "Manyatta", "Obunga", "Ahero", "Nyamasaria", "Kisumu Central"],
  Nakuru: ["Kaptembwa", "Rhonda", "Gilgil", "Molo", "Naivasha", "Bahati"],
  Kiambu: ["Ruiru", "Githurai", "Limuru", "Thika", "Kikuyu", "Kiambaa"],
  Machakos: ["Mavoko", "Tala", "Kangundo", "Mwala", "Kathiani", "Yatta"],
  Kajiado: ["Kitengela", "Ngong", "Isinya", "Loitokitok", "Namanga", "Magadi"],
  Turkana: ["Lodwar", "Kakuma", "Lokichoggio", "Kalokol", "Lokitaung", "Turkwel"],
  Garissa: ["Dadaab", "Balambala", "Ijara", "Modogashe", "Hulugho", "Garissa Town"],
  Kilifi: ["Malindi", "Ganze", "Kaloleni", "Rabai", "Mtwapa", "Magarini"],
  Kakamega: ["Mumias", "Butere", "Khwisero", "Lurambi", "Likuyani", "Navakholo"],
  Bungoma: ["Webuye", "Kanduyi", "Kimilili", "Sirisia", "Tongaren", "Mt Elgon"],
  Meru: ["Imenti", "Maua", "Nkubu", "Timau", "Tigania", "Buuri"],
  Nyeri: ["Othaya", "Mukurweini", "Karatina", "Tetu", "Kieni", "Mathira"],
  "Uasin Gishu": ["Eldoret", "Turbo", "Moiben", "Kesses", "Kapseret", "Soy"],
  "Homa Bay": ["Ndhiwa", "Mbita", "Rachuonyo", "Rangwe", "Karachuonyo", "Suba"],
  Migori: ["Suna", "Rongo", "Awendo", "Kuria", "Nyatike", "Uriri"],
  Isiolo: ["Isiolo Central", "Merti", "Garbatulla", "Oldonyiro", "Kinna", "Burat"],
  Samburu: ["Maralal", "Wamba", "Baragoi", "Archers Post", "South Horr", "Loosuk"],
  "Taita Taveta": ["Voi", "Mwatate", "Wundanyi", "Taveta", "Mbololo", "Bura"],
  Makueni: ["Wote", "Kibwezi", "Makindu", "Mbooni", "Kathonzweni", "Emali"],
};

const supportNeeds = [
  "Grant reporting",
  "M&E coaching",
  "Financial controls",
  "Loan follow-up",
  "Outcome verification",
  "Safeguarding review",
  "Data cleanup",
  "Proposal support",
  "County advocacy evidence",
  "Community feedback capture",
];

const cboNames = [
  "Kibera Community Action Network",
  "Kilifi Women Enterprise Forum",
  "Turkana Pastoralist Resilience Initiative",
  "Kisumu Youth Skills Hub",
  "Garissa Peace and Livelihoods Group",
  "Nakuru Community Health Volunteers Network",
  "Makueni Water Access Coalition",
  "Mathare Livelihoods and Rights Forum",
  "Likoni Women Savings Cooperative",
  "Kakamega Community Savings Network",
  "Bungoma Small Enterprise Forum",
  "Mombasa Youth Digital Inclusion Hub",
  "Kiambu Girls Education Support Circle",
  "Machakos Food Security Collective",
  "Kajiado Pastoralist Women Forum",
  "Samburu Community Peace Council",
  "Isiolo Climate Adaptation Network",
  "Meru Farmers Enterprise Platform",
  "Nyeri Community Health Alliance",
  "Homa Bay Girls Retention Initiative",
  "Migori Market Women Collective",
  "Uasin Gishu Youth Enterprise Hub",
  "Taita Taveta Water Stewardship Forum",
  "Kisauni Community Learning Circle",
  "Mukuru Social Enterprise Network",
  "Kayole Skills and Enterprise Forum",
  "Korogocho Local Advocacy Group",
  "Ahero Food Systems Collective",
  "Nyalenda Women Enterprise Network",
  "Kaptembwa Community Health Forum",
  "Naivasha Youth Livelihoods Trust",
  "Ruiru Digital Skills Collective",
  "Githurai Community Savings Forum",
  "Mavoko Youth Enterprise Platform",
  "Tala Women Economic Forum",
  "Kitengela Local Business Circle",
  "Ngong Civic Voice Network",
  "Kakuma Refugee Host Community Forum",
  "Lodwar Water and Livelihoods Network",
  "Dadaab Peace and Enterprise Group",
  "Malindi Coastal Livelihoods Forum",
  "Ganze Women Farmers Collective",
  "Mumias Youth Skills Forum",
  "Webuye Enterprise Savings Circle",
  "Maua Community Health Volunteers Forum",
  "Karatina Small Traders Association",
  "Eldoret Youth Enterprise Network",
  "Mbita Fishing Communities Forum",
  "Suna Civic Participation Network",
  "Garbatulla Pastoralist Savings Forum",
  "Maralal Women Enterprise Circle",
  "Voi Water Access Initiative",
  "Wote Community Action Forum",
  "Makindu Market Traders Collective",
];

const orgNouns = [
  "Community Action Forum",
  "Women Enterprise Circle",
  "Youth Skills Hub",
  "Savings Group Network",
  "Water Access Coalition",
  "Health Volunteers Forum",
  "Climate Resilience Initiative",
  "Local Advocacy Platform",
  "Digital Inclusion Lab",
  "Small Traders Collective",
  "Peace and Livelihoods Group",
  "Food Security Collective",
];

const firstNames = [
  "Amina",
  "Wanjiku",
  "Otieno",
  "Fatuma",
  "Njeri",
  "Mutua",
  "Achieng",
  "Chebet",
  "Mohamed",
  "Mwikali",
  "Kiptoo",
  "Adhiambo",
  "Njoki",
  "Barasa",
  "Nasra",
  "Lekuta",
  "Wekesa",
  "Wairimu",
];

const lastNames = [
  "Kamau",
  "Onyango",
  "Wambua",
  "Kiplagat",
  "Ali",
  "Mwende",
  "Ochieng",
  "Wafula",
  "Kariuki",
  "Noor",
  "Lekuton",
  "Muthoni",
  "Akinyi",
  "Mutiso",
  "Chepkemoi",
  "Naliaka",
  "Ouma",
  "Hassan",
];

const fundingSources = [
  "GAC Community Fund",
  "Grassroots Resilience Window",
  "Women Enterprise Revolving Fund",
  "County Innovation Pool",
  "Youth Livelihoods Facility",
  "Donor Matched Grant Window",
  "Water and Sanitation Response Fund",
  "Local Advocacy Support Fund",
];

const projectNameRoots = [
  "County Youth Skills Accelerator",
  "Women Enterprise Revolving Fund",
  "Dryland Climate Resilience Grants",
  "Kitchen Garden Food Security Circles",
  "Community Health Volunteer Outreach",
  "School Retention Support Bursaries",
  "Water Access and Sanitation Upgrade",
  "Peace Forums and Civic Voice",
  "Digital Inclusion Labs",
  "Market Link Access for Small Enterprises",
  "Savings Group Strengthening",
  "Local Advocacy Fellowship",
];

const projectThemeSequence = [
  "Youth skills and livelihoods",
  "Women economic empowerment",
  "Climate resilience",
  "Food security",
  "Community health",
  "Water and sanitation",
  "Youth skills and livelihoods",
  "Women economic empowerment",
  "Digital inclusion",
  "Food security",
  "Climate resilience",
  "Women economic empowerment",
  "Youth skills and livelihoods",
  "Women economic empowerment",
  "Youth skills and livelihoods",
  "Water and sanitation",
  "Climate resilience",
  "Community health",
  "Youth skills and livelihoods",
  "Women economic empowerment",
  "Food security",
  "Community health",
  "Climate resilience",
  "Water and sanitation",
  "Youth skills and livelihoods",
  "Women economic empowerment",
  "Water and sanitation",
  "Food security",
  "Community health",
  "Digital inclusion",
  "Youth skills and livelihoods",
  "Women economic empowerment",
  "Climate resilience",
  "Food security",
  "Water and sanitation",
  "Youth skills and livelihoods",
  "Women economic empowerment",
  "Food security",
  "Climate resilience",
  "Youth skills and livelihoods",
  "Climate resilience",
  "Women economic empowerment",
  "Community health",
  "Water and sanitation",
  "Digital inclusion",
  "Food security",
  "Community savings groups",
  "Education support",
];

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function roundedAmount(value: number, nearest = 50_000) {
  return Math.round(value / nearest) * nearest;
}

function pick<T>(items: T[], index: number) {
  return items[index % items.length];
}

function wardsFor(county: string) {
  return countyWards[county] ?? [county];
}

function organizationStatus(index: number): Organization["status"] {
  if (index < 86) return "active";
  if (index < 104) return "new";
  if (index < 166) return "dormant";
  return "at_risk";
}

function reportingStatus(index: number): Organization["reportingStatus"] {
  if (index % 17 === 0 || index % 41 === 0) return "overdue";
  if (index % 9 === 0) return "due_soon";
  return "current";
}

function projectStatus(index: number): ProjectStatus {
  if (index < 34) return "active";
  if (index < 41) return "at_risk";
  if (index < 47) return "completed";
  return "planned";
}

function projectRisk(index: number, status: ProjectStatus): RiskLevel {
  if (status === "at_risk") return index % 2 === 0 ? "high" : "medium";
  if (index % 13 === 0 || index % 19 === 0) return "medium";
  return "low";
}

function organizationName(profile: CountryProfile, ward: string, index: number) {
  if (index < cboNames.length) return cboNames[index];
  return `${ward} ${pick(orgNouns, index * 5)}`;
}

export const organizations: Organization[] = Array.from({ length: 186 }, (_, index) => {
  const countyProfile = pick(countryProfiles, index * 5 + Math.floor(index / 14));
  const ward = pick(wardsFor(countyProfile.country), index * 3);
  const status = organizationStatus(index);
  const sinceYear = 2016 + (index % 9);
  const focusA = pick(projectThemes, index * 2);
  const focusB = pick(projectThemes, index * 2 + 3);
  const engagementBase =
    status === "active" ? 68 : status === "new" ? 60 : status === "at_risk" ? 44 : 34;
  const engagementScore = Math.min(96, engagementBase + ((index * 7) % 23));
  const lastMonth = 1 + ((index * 5) % 5);
  const lastDay = 3 + ((index * 7) % 24);

  return {
    id: `org-${String(index + 1).padStart(3, "0")}`,
    name: organizationName(countyProfile, ward, index),
    country: countyProfile.country,
    region: countyProfile.region,
    countyOrState: ward,
    focusAreas: [focusA, focusB],
    memberSince: isoDate(sinceYear, 1 + (index % 12), 8 + (index % 18)),
    status,
    engagementScore,
    contactPerson: `${pick(firstNames, index)} ${pick(lastNames, index * 2)}`,
    supportNeed: pick(supportNeeds, index * 4),
    lastActivityDate: isoDate(2026, lastMonth, lastDay),
    reportingStatus: reportingStatus(index),
  };
});

export const projects: Project[] = Array.from({ length: 48 }, (_, index) => {
  const organization = organizations[(index * 7) % 112];
  const status = projectStatus(index);
  const startMonth = 1 + (index % 10);
  const endMonth = Math.min(12, startMonth + 5 + (index % 4));
  const budget = roundedAmount(2_600_000 + ((index * 910_000) % 5_800_000));
  const completionPct =
    status === "completed"
      ? 100
      : status === "planned"
        ? 14 + (index % 9)
        : status === "at_risk"
          ? 46 + (index % 23)
          : 40 + (index % 48);
  const disbursementRatio =
    status === "planned" ? 0.18 : status === "completed" ? 0.92 : 0.58 + ((index % 21) / 100);
  const peopleReached = 1_250 + ((index * 531) % 5_500);

  return {
    id: `proj-${String(index + 1).padStart(3, "0")}`,
    name: `${pick(projectNameRoots, index)} - ${organization.countyOrState}`,
    organizationId: organization.id,
    country: organization.country,
    region: organization.region,
    theme: pick(projectThemeSequence, index),
    startDate: isoDate(2025, startMonth, 1 + (index % 22)),
    endDate: isoDate(2026, endMonth, 5 + (index % 20)),
    budgetUsd: budget,
    disbursedUsd: roundedAmount(budget * disbursementRatio),
    completionPct,
    peopleReached,
    status,
    riskLevel: projectRisk(index, status),
  };
});

export const grants: Grant[] = Array.from({ length: 85 }, (_, index) => {
  const project = projects[index % projects.length];
  const approved = roundedAmount(1_150_000 + ((index * 325_000) % 2_900_000));
  const utilizationPct = 54 + ((index * 11) % 42);
  const status: Grant["status"] =
    index % 9 === 0 ? "approved" : index % 7 === 0 ? "closed" : "disbursed";
  const month = 1 + ((index * 2) % 12);

  return {
    id: `grant-${String(index + 1).padStart(3, "0")}`,
    organizationId: project.organizationId,
    projectId: project.id,
    amountApprovedUsd: approved,
    amountDisbursedUsd: roundedAmount(approved * (utilizationPct / 100)),
    fundingSource: pick(fundingSources, index),
    approvalDate: isoDate(index % 5 === 0 ? 2025 : 2026, month, 6 + (index % 18)),
    disbursementDate: isoDate(index % 6 === 0 ? 2025 : 2026, Math.min(12, month + 1), 9 + (index % 15)),
    utilizationPct,
    status,
  };
});

export const loans: Loan[] = Array.from({ length: 42 }, (_, index) => {
  const project = projects[(index * 5) % projects.length];
  const principal = roundedAmount(800_000 + ((index * 230_000) % 1_650_000));
  const status: Loan["repaymentStatus"] =
    index % 11 === 0 ? "overdue" : index % 7 === 0 ? "due_soon" : index % 6 === 0 ? "closed" : "current";
  const repaidRatio =
    status === "closed" ? 1 : status === "overdue" ? 0.38 : status === "due_soon" ? 0.52 : 0.67;
  const repaid = roundedAmount(principal * repaidRatio);
  const disbursedMonth = 1 + ((index * 3) % 12);
  const dueMonth = 1 + ((disbursedMonth + 5 + (index % 5)) % 12);

  return {
    id: `loan-${String(index + 1).padStart(3, "0")}`,
    organizationId: project.organizationId,
    projectId: project.id,
    principalUsd: principal,
    disbursedDate: isoDate(index % 3 === 0 ? 2025 : 2026, disbursedMonth, 4 + (index % 19)),
    dueDate: isoDate(2026, dueMonth === 0 ? 12 : dueMonth, 3 + (index % 24)),
    amountRepaidUsd: Math.min(principal, repaid),
    outstandingUsd: Math.max(0, principal - repaid),
    repaymentStatus: status,
  };
});

export const impactMetrics: ImpactMetric[] = projects.map((project, index) => {
  const people = project.peopleReached;
  return {
    id: `impact-${String(index + 1).padStart(3, "0")}`,
    projectId: project.id,
    period: "2026-Q2",
    peopleReached: people,
    householdsReached: Math.round(people / 4.5),
    womenReached: Math.round(people * (0.5 + ((index % 8) / 100))),
    youthReached: Math.round(people * (0.35 + ((index % 7) / 100))),
    jobsSupported: Math.round(people * (0.024 + ((index % 4) / 1000))),
    leadersSupported: 9 + ((index * 3) % 34),
  };
});

export const monthlyTrends: MonthlyTrend[] = [
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
].map((month, index) => ({
  month,
  grants: roundedAmount(9_400_000 + ((index * 1_630_000) % 7_400_000)),
  loans: roundedAmount(4_200_000 + ((index * 940_000) % 4_800_000)),
  repayments: roundedAmount(2_800_000 + ((index * 820_000) % 4_200_000)),
  outstanding: roundedAmount(42_000_000 + ((index * 1_430_000) % 16_000_000)),
}));

export const impactStories: ImpactStory[] = [
  {
    title: "Women-led savings groups move into formal market supply",
    country: "Kilifi",
    theme: "Women economic empowerment",
    summary:
      "Enterprise groups in Ganze used small grants and coaching to package orders for local schools and health facilities.",
    metric: "KES 6.2M in member sales tracked",
  },
  {
    title: "Pastoralist committees keep water points operational",
    country: "Turkana",
    theme: "Climate resilience",
    summary:
      "Ward teams combined maintenance funds with community reporting to reduce dry-season water point downtime.",
    metric: "18 water points monitored",
  },
  {
    title: "Youth cohorts convert digital training into paid work",
    country: "Nairobi",
    theme: "Digital inclusion",
    summary:
      "Kibera and Mathare partners linked trainees to practical assignments after short skills labs and mentorship sessions.",
    metric: "312 youth livelihoods supported",
  },
];

export const dataIssues: DataIssue[] = [
  {
    record: "Turkana Pastoralist Resilience Initiative",
    owner: "Programs",
    issue: "April reach figures need ward-level verification",
    severity: "medium",
    status: "in_review",
  },
  {
    record: "Garissa Peace and Livelihoods Group",
    owner: "Finance",
    issue: "Loan repayment receipt not matched to project record",
    severity: "high",
    status: "open",
  },
  {
    record: "Kilifi Women Enterprise Forum",
    owner: "M&E",
    issue: "Two enterprise group membership lists missing gender disaggregation",
    severity: "medium",
    status: "open",
  },
  {
    record: "Mukuru Social Enterprise Network",
    owner: "Partnerships",
    issue: "Duplicate contact profile detected",
    severity: "low",
    status: "resolved",
  },
  {
    record: "County upload 2026-05",
    owner: "Data",
    issue: "Eleven member activity logs submitted after close date",
    severity: "medium",
    status: "open",
  },
];

export const reportTemplates: ReportTemplate[] = [
  {
    title: "Executive Impact Summary",
    audience: "Board and leadership",
    description: "People reached, funds deployed, portfolio risk, and the priority decisions for leadership.",
    defaultFilters: ["Period", "Region", "County"],
    artifact: {
      format: "PPTX",
      href: "/reports/gac-executive-impact-summary.pptx",
      fileName: "gac-executive-impact-summary.pptx",
      sizeLabel: "1.9 MB",
      slideCount: 3,
    },
  },
  {
    title: "Donor Funding Report",
    audience: "Funders",
    description: "Approved funding, disbursement progress, utilization, outcomes, and funding gaps.",
    defaultFilters: ["Funding type", "Theme", "County"],
    artifact: {
      format: "PPTX",
      href: "/reports/gac-donor-funding-report.pptx",
      fileName: "gac-donor-funding-report.pptx",
      sizeLabel: "1.9 MB",
      slideCount: 3,
    },
  },
  {
    title: "County Performance Report",
    audience: "County and regional teams",
    description: "County footprint, active CBOs, projects, people reached, and support needs.",
    defaultFilters: ["Region", "County", "Member status"],
    artifact: {
      format: "PPTX",
      href: "/reports/gac-county-performance-report.pptx",
      fileName: "gac-county-performance-report.pptx",
      sizeLabel: "1.9 MB",
      slideCount: 3,
    },
  },
  {
    title: "Project Portfolio Report",
    audience: "Programs",
    description: "Community-led project status, completion, risk, funding utilization, and follow-ups.",
    defaultFilters: ["Theme", "Status", "Risk"],
    artifact: {
      format: "PPTX",
      href: "/reports/gac-project-portfolio-report.pptx",
      fileName: "gac-project-portfolio-report.pptx",
      sizeLabel: "1.9 MB",
      slideCount: 3,
    },
  },
  {
    title: "Loan Portfolio Report",
    audience: "Finance",
    description: "Loans disbursed, repayments received, outstanding balances, due soon, and overdue items.",
    defaultFilters: ["Repayment status", "Region", "Due date"],
    artifact: {
      format: "PPTX",
      href: "/reports/gac-loan-portfolio-report.pptx",
      fileName: "gac-loan-portfolio-report.pptx",
      sizeLabel: "1.9 MB",
      slideCount: 3,
    },
  },
  {
    title: "Member Engagement Report",
    audience: "Partnerships",
    description: "Member activity, engagement, support needs, reporting status, and growth trends.",
    defaultFilters: ["Member status", "Region", "Focus area"],
    artifact: {
      format: "PPTX",
      href: "/reports/gac-member-engagement-report.pptx",
      fileName: "gac-member-engagement-report.pptx",
      sizeLabel: "1.9 MB",
      slideCount: 3,
    },
  },
  {
    title: "Data Quality Report",
    audience: "M&E and data teams",
    description: "Completeness, overdue reports, duplicate records, and sign-off confidence.",
    defaultFilters: ["Severity", "Owner", "Status"],
    artifact: {
      format: "PPTX",
      href: "/reports/gac-data-quality-report.pptx",
      fileName: "gac-data-quality-report.pptx",
      sizeLabel: "1.9 MB",
      slideCount: 3,
    },
  },
];
