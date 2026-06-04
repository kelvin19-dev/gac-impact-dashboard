import {
  asOfDate,
  countryProfiles,
  dataIssues,
  grants,
  impactMetrics,
  loans,
  monthlyTrends,
  organizations,
  projects,
  type FundingType,
  type Grant,
  type Loan,
  type MemberStatus,
  type Organization,
  type PeriodValue,
  type Project,
  type RegionValue,
} from "@/data/dashboard-content";

export type DashboardFilters = {
  period: PeriodValue;
  region: RegionValue;
  country: string;
  projectType: string;
  fundingType: FundingType;
  memberStatus: MemberStatus;
};

export type SummaryMetrics = {
  memberOrganizations: number;
  activeCbos: number;
  newMembers: number;
  dormantMembers: number;
  countriesRepresented: number;
  activeCountries: number;
  activeProjects: number;
  completedProjects: number;
  projectsAtRisk: number;
  peopleReached: number;
  householdsReached: number;
  womenReached: number;
  youthReached: number;
  jobsSupported: number;
  leadersSupported: number;
  grantsAwarded: number;
  grantsDisbursed: number;
  averageGrantSize: number;
  grantRecipients: number;
  loansDisbursed: number;
  loanRepayments: number;
  outstandingLoans: number;
  repaymentRate: number;
  loansDueSoon: number;
  overdueLoans: number;
  fundingGap: number;
  engagementScore: number;
  reportingCompleteness: number;
  dataCompletenessScore: number;
};

export type ProjectMixItem = {
  name: string;
  value: number;
  projects: number;
  people: number;
};

export type RegionSummary = {
  region: string;
  countries: number;
  activeCbos: number;
  activeProjects: number;
  peopleReached: number;
  fundsDeployed: number;
  projectsAtRisk: number;
};

export type MapPoint = {
  country: string;
  region: string;
  lat: number;
  lon: number;
  activeCbos: number;
  activeProjects: number;
  peopleReached: number;
  fundsDeployed: number;
};

export type LoanAgingBucket = {
  bucket: string;
  count: number;
  outstanding: number;
};

export type AlertItem = {
  title: string;
  detail: string;
  severity: "low" | "medium" | "high";
};

export type DashboardData = {
  filters: DashboardFilters;
  organizations: Organization[];
  projects: Project[];
  grants: Grant[];
  loans: Loan[];
  summary: SummaryMetrics;
  projectMix: ProjectMixItem[];
  fundingByRegion: { region: string; amount: number }[];
  monthlyTrend: typeof monthlyTrends;
  regionalSummary: RegionSummary[];
  mapPoints: MapPoint[];
  loanAging: LoanAgingBucket[];
  alerts: AlertItem[];
};

const periodRanges: Record<PeriodValue, { start: Date; end: Date; label: string }> = {
  quarter: {
    start: new Date("2026-04-01T00:00:00Z"),
    end: new Date("2026-06-30T23:59:59Z"),
    label: "This quarter",
  },
  ytd: {
    start: new Date("2026-01-01T00:00:00Z"),
    end: new Date("2026-05-31T23:59:59Z"),
    label: "YTD",
  },
  last12: {
    start: new Date("2025-06-01T00:00:00Z"),
    end: new Date("2026-05-31T23:59:59Z"),
    label: "Last 12 months",
  },
  custom: {
    start: new Date("2025-09-01T00:00:00Z"),
    end: new Date("2026-05-31T23:59:59Z"),
    label: "Sep 2025 - May 2026",
  },
};

export function getPeriodLabel(period: PeriodValue) {
  return periodRanges[period].label;
}

export function getCountryOptions(region: RegionValue) {
  const counties =
    region === "Global"
      ? countryProfiles.map((item) => item.country)
      : countryProfiles.filter((item) => item.region === region).map((item) => item.country);

  return ["All counties", ...counties];
}

export const getCountyOptions = getCountryOptions;

export function regionLabel(region: RegionValue) {
  return region === "Global" ? "Kenya" : region;
}

export function formatCurrency(value: number) {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000) {
    const millions = abs / 1_000_000;
    const precision = millions >= 100 ? 0 : 1;
    return `${sign}KES ${millions.toFixed(precision).replace(/\.0$/, "")}M`;
  }

  if (abs >= 1_000) {
    return `${sign}KES ${Math.round(abs / 1000)}K`;
  }

  return `${sign}KES ${Math.round(abs).toLocaleString("en-US")}`;
}

export function formatCompact(value: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: value >= 100_000 ? 1 : 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

export function formatPercent(value: number) {
  return `${Math.round(value * 10) / 10}%`;
}

export function statusLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseDate(value: string) {
  return new Date(`${value}T00:00:00Z`);
}

function dateInPeriod(dateValue: string, period: PeriodValue) {
  const date = parseDate(dateValue);
  const range = periodRanges[period];
  return date >= range.start && date <= range.end;
}

function projectOverlapsPeriod(project: Project, period: PeriodValue) {
  const range = periodRanges[period];
  return parseDate(project.startDate) <= range.end && parseDate(project.endDate) >= range.start;
}

function sum<T>(items: T[], getter: (item: T) => number) {
  return items.reduce((total, item) => total + getter(item), 0);
}

function uniqueCount<T>(items: T[], getter: (item: T) => string | undefined) {
  return new Set(items.map(getter).filter(Boolean)).size;
}

function average<T>(items: T[], getter: (item: T) => number) {
  if (items.length === 0) return 0;
  return sum(items, getter) / items.length;
}

function groupBy<T>(items: T[], getter: (item: T) => string) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = getter(item);
    groups[key] = groups[key] ?? [];
    groups[key].push(item);
    return groups;
  }, {});
}

function projectIdsFor(projectsToUse: Project[]) {
  return new Set(projectsToUse.map((project) => project.id));
}

function organizationIdsFor(items: { organizationId: string }[]) {
  return new Set(items.map((item) => item.organizationId));
}

function filterOrganizations(filters: DashboardFilters) {
  return organizations.filter((organization) => {
    const regionMatch = filters.region === "Global" || organization.region === filters.region;
    const countryMatch =
      filters.country === "All counties" ||
      organization.country === filters.country;
    const statusMatch = filters.memberStatus === "all" || organization.status === filters.memberStatus;
    return regionMatch && countryMatch && statusMatch;
  });
}

function filterProjects(filters: DashboardFilters, organizationsToUse: Organization[]) {
  const organizationIds = new Set(organizationsToUse.map((organization) => organization.id));

  return projects.filter((project) => {
    const orgMatch = organizationIds.has(project.organizationId);
    const themeMatch = filters.projectType === "All project types" || project.theme === filters.projectType;
    return orgMatch && themeMatch && projectOverlapsPeriod(project, filters.period);
  });
}

function filterGrants(filters: DashboardFilters, projectsToUse: Project[]) {
  if (filters.fundingType !== "All" && filters.fundingType !== "Grant") return [];
  const ids = projectIdsFor(projectsToUse);
  return grants.filter((grant) => ids.has(grant.projectId) && dateInPeriod(grant.approvalDate, filters.period));
}

function filterLoans(filters: DashboardFilters, projectsToUse: Project[]) {
  if (filters.fundingType !== "All" && filters.fundingType !== "Loan") return [];
  const ids = projectIdsFor(projectsToUse);
  return loans.filter(
    (loan) =>
      (!loan.projectId || ids.has(loan.projectId)) && dateInPeriod(loan.disbursedDate, filters.period),
  );
}

function buildProjectMix(projectsToUse: Project[]) {
  const portfolioProjects = projectsToUse.filter(
    (project) => project.status === "active" || project.status === "at_risk",
  );
  const sourceProjects = portfolioProjects.length > 0 ? portfolioProjects : projectsToUse;
  const groups = groupBy(sourceProjects, (project) => project.theme);
  const total = Math.max(1, sourceProjects.length);

  return Object.entries(groups)
    .map(([name, items]) => ({
      name,
      value: Math.round((items.length / total) * 100),
      projects: items.length,
      people: sum(items, (project) => project.peopleReached),
    }))
    .sort((a, b) => b.projects - a.projects)
    .slice(0, 7);
}

function buildFundingByRegion(projectsToUse: Project[], grantsToUse: Grant[], loansToUse: Loan[]) {
  const projectById = new Map(projectsToUse.map((project) => [project.id, project]));
  const regionTotals = new Map<string, number>();

  for (const grant of grantsToUse) {
    const project = projectById.get(grant.projectId);
    if (!project) continue;
    regionTotals.set(project.region, (regionTotals.get(project.region) ?? 0) + grant.amountDisbursedUsd);
  }

  for (const loan of loansToUse) {
    if (!loan.projectId) continue;
    const project = projectById.get(loan.projectId);
    if (!project) continue;
    regionTotals.set(project.region, (regionTotals.get(project.region) ?? 0) + loan.principalUsd);
  }

  return Array.from(regionTotals.entries())
    .map(([region, amount]) => ({ region, amount }))
    .sort((a, b) => b.amount - a.amount);
}

function buildRegionalSummary(
  organizationsToUse: Organization[],
  projectsToUse: Project[],
  grantsToUse: Grant[],
  loansToUse: Loan[],
) {
  const grantsByProject = groupBy(grantsToUse, (grant) => grant.projectId);
  const loansByProject = groupBy(loansToUse.filter((loan) => loan.projectId), (loan) => loan.projectId ?? "");
  const projectsByRegion = groupBy(projectsToUse, (project) => project.region);
  const orgsByRegion = groupBy(organizationsToUse, (organization) => organization.region);

  return Object.entries(projectsByRegion)
    .map(([region, regionProjects]) => {
      const regionOrgs = orgsByRegion[region] ?? [];
      const fundsDeployed = regionProjects.reduce((total, project) => {
        const projectGrants = grantsByProject[project.id] ?? [];
        const projectLoans = loansByProject[project.id] ?? [];
        return (
          total +
          sum(projectGrants, (grant) => grant.amountDisbursedUsd) +
          sum(projectLoans, (loan) => loan.principalUsd)
        );
      }, 0);

      return {
        region,
        countries: uniqueCount(regionProjects, (project) => project.country),
        activeCbos: regionOrgs.filter((organization) => organization.status === "active").length,
        activeProjects: regionProjects.filter(
          (project) => project.status === "active" || project.status === "at_risk",
        ).length,
        peopleReached: sum(regionProjects, (project) => project.peopleReached),
        fundsDeployed,
        projectsAtRisk: regionProjects.filter(
          (project) => project.status === "at_risk" || project.riskLevel === "high",
        ).length,
      };
    })
    .sort((a, b) => b.peopleReached - a.peopleReached);
}

function buildMapPoints(
  organizationsToUse: Organization[],
  projectsToUse: Project[],
  grantsToUse: Grant[],
  loansToUse: Loan[],
) {
  const orgsByCountry = groupBy(organizationsToUse, (organization) => organization.country);
  const projectsByCountry = groupBy(projectsToUse, (project) => project.country);
  const projectById = new Map(projectsToUse.map((project) => [project.id, project]));
  const fundsByCountry = new Map<string, number>();

  for (const grant of grantsToUse) {
    const project = projectById.get(grant.projectId);
    if (!project) continue;
    fundsByCountry.set(project.country, (fundsByCountry.get(project.country) ?? 0) + grant.amountDisbursedUsd);
  }

  for (const loan of loansToUse) {
    if (!loan.projectId) continue;
    const project = projectById.get(loan.projectId);
    if (!project) continue;
    fundsByCountry.set(project.country, (fundsByCountry.get(project.country) ?? 0) + loan.principalUsd);
  }

  return countryProfiles
    .map((country) => {
      const countryProjects = projectsByCountry[country.country] ?? [];
      const countryOrgs = orgsByCountry[country.country] ?? [];

      return {
        country: country.country,
        region: country.region,
        lat: country.lat,
        lon: country.lon,
        activeCbos: countryOrgs.filter((organization) => organization.status === "active").length,
        activeProjects: countryProjects.filter(
          (project) => project.status === "active" || project.status === "at_risk",
        ).length,
        peopleReached: sum(countryProjects, (project) => project.peopleReached),
        fundsDeployed: fundsByCountry.get(country.country) ?? 0,
      };
    })
    .filter((point) => point.activeCbos > 0 || point.activeProjects > 0 || point.fundsDeployed > 0);
}

function buildLoanAging(loansToUse: Loan[]) {
  const asOf = new Date(asOfDate);
  const buckets: LoanAgingBucket[] = [
    { bucket: "Current", count: 0, outstanding: 0 },
    { bucket: "Due in 30 days", count: 0, outstanding: 0 },
    { bucket: "1-30 overdue", count: 0, outstanding: 0 },
    { bucket: "31-60 overdue", count: 0, outstanding: 0 },
    { bucket: "61-90 overdue", count: 0, outstanding: 0 },
    { bucket: "90+ overdue", count: 0, outstanding: 0 },
  ];

  for (const loan of loansToUse) {
    if (loan.outstandingUsd <= 0) {
      buckets[0].count += 1;
      continue;
    }

    const due = parseDate(loan.dueDate);
    const days = Math.ceil((due.getTime() - asOf.getTime()) / 86_400_000);
    let bucketIndex = 0;
    if (days >= 0 && days <= 30) bucketIndex = 1;
    if (days < 0 && days >= -30) bucketIndex = 2;
    if (days < -30 && days >= -60) bucketIndex = 3;
    if (days < -60 && days >= -90) bucketIndex = 4;
    if (days < -90) bucketIndex = 5;

    buckets[bucketIndex].count += 1;
    buckets[bucketIndex].outstanding += loan.outstandingUsd;
  }

  return buckets;
}

function buildAlerts(
  projectsToUse: Project[],
  organizationsToUse: Organization[],
  loansToUse: Loan[],
  summary: SummaryMetrics,
) {
  const highRisk = projectsToUse.filter((project) => project.status === "at_risk" || project.riskLevel === "high");
  const overdueReports = organizationsToUse.filter((organization) => organization.reportingStatus === "overdue");
  const overdueLoans = loansToUse.filter((loan) => loan.repaymentStatus === "overdue" && loan.outstandingUsd > 0);
  const overdueByRegion = Object.entries(groupBy(overdueReports, (organization) => organization.region)).sort(
    (a, b) => b[1].length - a[1].length,
  )[0];
  const gapsByTheme = Object.entries(groupBy(projectsToUse, (project) => project.theme))
    .map(([theme, themeProjects]) => ({
      theme,
      gap: sum(themeProjects, (project) => Math.max(0, project.budgetUsd - project.disbursedUsd)),
    }))
    .sort((a, b) => b.gap - a.gap);
  const topGap = gapsByTheme[0];

  return [
    {
      title: `${highRisk.length} projects require follow-up`,
      detail: highRisk[0]
        ? `${highRisk[0].theme} in ${highRisk[0].country} County has the highest current risk flag.`
        : "No high-risk project flags in the selected view.",
      severity: highRisk.length > 4 ? "high" : highRisk.length > 0 ? "medium" : "low",
    },
    {
      title: `${overdueReports.length} member reports overdue`,
      detail: overdueByRegion
        ? `Mostly from ${overdueByRegion[0]}, with reach figures and activity logs still pending.`
        : "No overdue member reports in the selected view.",
      severity: overdueReports.length > 5 ? "high" : overdueReports.length > 0 ? "medium" : "low",
    },
    {
      title: `${overdueLoans.length} loan accounts overdue`,
      detail:
        overdueLoans.length > 0
          ? `${formatCurrency(sum(overdueLoans, (loan) => loan.outstandingUsd))} remains open on overdue accounts.`
          : "No overdue loan balances in the selected view.",
      severity: overdueLoans.length > 2 ? "high" : overdueLoans.length > 0 ? "medium" : "low",
    },
    {
      title: `${formatCurrency(summary.fundingGap)} estimated funding gap`,
      detail: topGap
        ? `${topGap.theme} carries the largest unfunded need at ${formatCurrency(topGap.gap)}.`
        : "Funding is broadly aligned to active project needs in this view.",
      severity: summary.fundingGap > 20_000_000 ? "high" : "medium",
    },
  ] satisfies AlertItem[];
}

export function getDashboardData(filters: DashboardFilters): DashboardData {
  const organizationsToUse = filterOrganizations(filters);
  const projectsToUse = filterProjects(filters, organizationsToUse);
  const grantsToUse = filterGrants(filters, projectsToUse);
  const loansToUse = filterLoans(filters, projectsToUse);
  const projectIds = projectIdsFor(projectsToUse);
  const impactToUse = impactMetrics.filter((metric) => projectIds.has(metric.projectId));
  const grantRecipients = organizationIdsFor(grantsToUse).size;
  const loanPrincipal = sum(loansToUse, (loan) => loan.principalUsd);
  const loanRepayments = sum(loansToUse, (loan) => loan.amountRepaidUsd);
  const missingDataWeight = dataIssues.filter((issue) => issue.status !== "resolved").length * 4;
  const overdueReports = organizationsToUse.filter((organization) => organization.reportingStatus === "overdue").length;

  const summary: SummaryMetrics = {
    memberOrganizations: organizationsToUse.length,
    activeCbos: organizationsToUse.filter((organization) => organization.status === "active").length,
    newMembers: organizationsToUse.filter((organization) => organization.status === "new").length,
    dormantMembers: organizationsToUse.filter((organization) => organization.status === "dormant").length,
    countriesRepresented: uniqueCount(organizationsToUse, (organization) => organization.country),
    activeCountries: uniqueCount(projectsToUse, (project) => project.country),
    activeProjects: projectsToUse.filter((project) => project.status === "active" || project.status === "at_risk").length,
    completedProjects: projectsToUse.filter((project) => project.status === "completed").length,
    projectsAtRisk: projectsToUse.filter(
      (project) => project.status === "at_risk" || project.riskLevel === "high",
    ).length,
    peopleReached: sum(impactToUse, (metric) => metric.peopleReached),
    householdsReached: sum(impactToUse, (metric) => metric.householdsReached),
    womenReached: sum(impactToUse, (metric) => metric.womenReached),
    youthReached: sum(impactToUse, (metric) => metric.youthReached),
    jobsSupported: sum(impactToUse, (metric) => metric.jobsSupported),
    leadersSupported: sum(impactToUse, (metric) => metric.leadersSupported),
    grantsAwarded: sum(grantsToUse, (grant) => grant.amountApprovedUsd),
    grantsDisbursed: sum(grantsToUse, (grant) => grant.amountDisbursedUsd),
    averageGrantSize: average(grantsToUse, (grant) => grant.amountApprovedUsd),
    grantRecipients,
    loansDisbursed: loanPrincipal,
    loanRepayments,
    outstandingLoans: sum(loansToUse, (loan) => loan.outstandingUsd),
    repaymentRate: loanPrincipal > 0 ? (loanRepayments / loanPrincipal) * 100 : 0,
    loansDueSoon: loansToUse.filter((loan) => loan.repaymentStatus === "due_soon").length,
    overdueLoans: loansToUse.filter((loan) => loan.repaymentStatus === "overdue").length,
    fundingGap: sum(projectsToUse, (project) => Math.max(0, project.budgetUsd - project.disbursedUsd)),
    engagementScore: average(organizationsToUse, (organization) => organization.engagementScore),
    reportingCompleteness:
      organizationsToUse.length > 0 ? ((organizationsToUse.length - overdueReports) / organizationsToUse.length) * 100 : 0,
    dataCompletenessScore: Math.max(72, 96 - missingDataWeight - Math.min(12, overdueReports)),
  };

  return {
    filters,
    organizations: organizationsToUse,
    projects: projectsToUse,
    grants: grantsToUse,
    loans: loansToUse,
    summary,
    projectMix: buildProjectMix(projectsToUse),
    fundingByRegion: buildFundingByRegion(projectsToUse, grantsToUse, loansToUse),
    monthlyTrend: monthlyTrends,
    regionalSummary: buildRegionalSummary(organizationsToUse, projectsToUse, grantsToUse, loansToUse),
    mapPoints: buildMapPoints(organizationsToUse, projectsToUse, grantsToUse, loansToUse),
    loanAging: buildLoanAging(loansToUse),
    alerts: buildAlerts(projectsToUse, organizationsToUse, loansToUse, summary),
  };
}

function regionScope(region: RegionValue) {
  return region === "Global" ? "the Kenya network" : `${region}`;
}

export function getExecutiveNarrative(data: DashboardData): string {
  const s = data.summary;
  const topTheme = data.projectMix[0]?.name ?? "community-led work";
  const deployed = s.grantsDisbursed + s.loansDisbursed;

  return (
    `Across ${regionScope(data.filters.region)}, GAC engaged ${formatNumber(s.activeCbos)} active CBOs across ` +
    `${formatNumber(s.activeCountries)} counties, reaching an estimated ${formatCompact(s.peopleReached)} people this ` +
    `${getPeriodLabel(data.filters.period).toLowerCase()}. ${formatCurrency(deployed)} was deployed through grants and loans, ` +
    `with repayment holding at ${formatPercent(s.repaymentRate)}. ${topTheme} leads the active portfolio, while ` +
    `${formatCurrency(s.fundingGap)} in community needs remains unfunded and ${formatNumber(s.projectsAtRisk)} projects need follow-up.`
  );
}

export function fundingGapInsight(data: DashboardData): string {
  const gaps = new Map<string, { gap: number; people: number; count: number }>();
  for (const project of data.projects) {
    const gap = Math.max(0, project.budgetUsd - project.disbursedUsd);
    const entry = gaps.get(project.theme) ?? { gap: 0, people: 0, count: 0 };
    entry.gap += gap;
    entry.people += project.peopleReached;
    entry.count += 1;
    gaps.set(project.theme, entry);
  }

  const top = Array.from(gaps.entries()).sort((a, b) => b[1].gap - a[1].gap)[0];
  if (!top || top[1].gap <= 0) {
    return "Funding is broadly aligned to active project needs in this view.";
  }

  return `${top[0]} carries the largest funding gap: ${formatCurrency(top[1].gap)} unfunded across ${top[1].count} projects, despite reaching ${formatCompact(top[1].people)} people.`;
}

export function repaymentInsight(data: DashboardData): string {
  const outstanding = data.summary.outstandingLoans;
  if (outstanding <= 0) {
    return "No outstanding loan balances in the selected view.";
  }

  const dueSoon = data.loanAging.find((bucket) => bucket.bucket === "Due in 30 days");
  const share = dueSoon ? (dueSoon.outstanding / outstanding) * 100 : 0;

  return `Repayment is stable at ${formatPercent(data.summary.repaymentRate)}, but ${formatPercent(share)} of outstanding balances (${formatCurrency(dueSoon?.outstanding ?? 0)}) fall due within 30 days; schedule follow-up now.`;
}

export function regionalInsight(data: DashboardData): string {
  const leader = data.regionalSummary[0];
  if (!leader) {
    return "No regional activity in the selected view.";
  }

  const watch = data.regionalSummary
    .slice()
    .sort((a, b) => b.projectsAtRisk - a.projectsAtRisk)[0];

  return `${leader.region} leads on reach with ${formatCompact(leader.peopleReached)} people across ${leader.activeProjects} active projects; ${watch.region} has the most follow-up flags (${watch.projectsAtRisk}).`;
}
