"use client";

import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  CircleAlert,
  Database,
  Download,
  FileText,
  Globe2,
  HandCoins,
  Info,
  Landmark,
  LayoutDashboard,
  Menu,
  Network as NetworkIcon,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  asOfDate,
  dataIssues,
  fundingTypeOptions,
  grants,
  impactStories,
  loans,
  memberStatusOptions,
  periodOptions,
  projectThemes,
  projects,
  regionOptions,
  reportTemplates,
  type FundingType,
  type MemberStatus,
  type Organization,
  type PeriodValue,
  type RegionValue,
} from "@/data/dashboard-content";
import {
  formatCompact,
  formatCurrency,
  formatNumber,
  formatPercent,
  fundingGapInsight,
  getDashboardData,
  getCountyOptions,
  getExecutiveNarrative,
  getPeriodLabel,
  regionalInsight,
  regionLabel,
  repaymentInsight,
  statusLabel,
  type AlertItem,
  type DashboardData,
  type DashboardFilters,
} from "@/lib/dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ViewId = "overview" | "network" | "projects" | "funding" | "impact" | "regions" | "reports" | "data";
type BadgeVariant =
  | "default"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "destructive";
type FilterSetter = <K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) => void;

const defaultFilters: DashboardFilters = {
  period: "last12",
  region: "Global",
  country: "All counties",
  projectType: "All project types",
  fundingType: "All",
  memberStatus: "all",
};

const navItems: { id: ViewId; label: string; icon: LucideIcon; title: string; description: string }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    title: "Executive overview",
    description: "Kenya network reach, funding, and the priorities leadership should act on next.",
  },
  {
    id: "network",
    label: "Network",
    icon: NetworkIcon,
    title: "Community network",
    description: "Member CBOs, engagement, and reporting health across Kenya counties.",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Target,
    title: "Community-led projects",
    description: "Portfolio status, risk, completion, reach, and funding utilization.",
  },
  {
    id: "funding",
    label: "Funding & Loans",
    icon: HandCoins,
    title: "Funding & loans",
    description: "Grants deployed, loan repayment performance, and outstanding balances.",
  },
  {
    id: "impact",
    label: "Impact & Evidence",
    icon: BadgeCheck,
    title: "Impact & evidence",
    description: "Who was reached, and the local evidence behind the numbers.",
  },
  {
    id: "regions",
    label: "Counties & Regions",
    icon: Globe2,
    title: "County footprint",
    description: "Where the network is strong, and where coordination needs support.",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    title: "Reports",
    description: "Donor- and board-ready report templates built from this data.",
  },
  {
    id: "data",
    label: "Data quality",
    icon: Database,
    title: "Data quality",
    description: "Reporting completeness and the records that need attention before sign-off.",
  },
];

const metricDefinitions = {
  activeCbos: "Community-based organizations with project, reporting, training, funding, or advocacy activity in this period.",
  peopleReached: "Estimated direct and indirect people reached by GAC-supported local initiatives.",
  fundsDeployed: "Grant disbursements plus loan principal deployed in the selected view.",
  repayment: "Share of disbursed loan principal that has been repaid in the selected view.",
  risk: "Projects flagged at risk or carrying a high risk level and needing leadership follow-up.",
  gap: "Estimated unfunded need: required project budgets minus funds disbursed.",
};

const statusMeta: Record<string, { label: string; variant: BadgeVariant }> = {
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "success" },
  current: { label: "Current", variant: "success" },
  resolved: { label: "Resolved", variant: "success" },
  new: { label: "New", variant: "info" },
  at_risk: { label: "At risk", variant: "warning" },
  due_soon: { label: "Due soon", variant: "warning" },
  in_review: { label: "In review", variant: "warning" },
  medium: { label: "Medium", variant: "warning" },
  open: { label: "Open", variant: "error" },
  overdue: { label: "Overdue", variant: "error" },
  high: { label: "High", variant: "error" },
  dormant: { label: "Dormant", variant: "secondary" },
  planned: { label: "Planned", variant: "secondary" },
  low: { label: "Low", variant: "success" },
};

function reportTemplateFor(title: string) {
  const template = reportTemplates.find((item) => item.title === title);
  if (!template) {
    throw new Error(`Missing report template: ${title}`);
  }
  return template;
}

const executiveImpactReport = reportTemplateFor("Executive Impact Summary");
const projectPortfolioReport = reportTemplateFor("Project Portfolio Report");

export function DashboardApp() {
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters);
  const [view, setView] = useState<ViewId>("overview");
  const [navOpen, setNavOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const data = useMemo(() => getDashboardData(filters), [filters]);
  const active = navItems.find((item) => item.id === view) ?? navItems[0];

  const updateFilter: FilterSetter = (key, value) =>
    setFilters((current) => ({ ...current, [key]: value }));
  const setPeriod = (period: PeriodValue) => setFilters((current) => ({ ...current, period }));
  const setRegion = (region: RegionValue) =>
    setFilters((current) => ({ ...current, region, country: "All counties" }));
  const openBrief = () => setBriefOpen(true);

  return (
    <TooltipProvider>
      <div className="min-h-svh bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-[1560px]">
          <aside
            className={cn(
              "sticky top-0 hidden h-svh shrink-0 flex-col overflow-y-auto bg-[linear-gradient(176deg,var(--color-royal-950)_0%,var(--color-ink)_78%)] py-6 text-sidebar-foreground transition-[width,padding] duration-300 lg:flex",
              sidebarCollapsed ? "w-[80px] px-3" : "w-[264px] px-4",
            )}
            data-collapsed={sidebarCollapsed}
          >
            <div
              className={cn(
                "flex items-center gap-2",
                sidebarCollapsed ? "flex-col justify-center" : "justify-between",
              )}
            >
              <BrandMark collapsed={sidebarCollapsed} />
              <SidebarCollapseButton
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed((current) => !current)}
              />
            </div>
            <nav className="mt-7 flex flex-1 flex-col gap-1">
              <NavList view={view} onSelect={setView} collapsed={sidebarCollapsed} />
            </nav>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
              <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <div className="flex items-start gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setNavOpen(true)}
                    aria-label="Open navigation"
                  >
                    <Menu />
                  </Button>
                  <div>
                    <h1 className="font-heading font-semibold text-xl tracking-[-0.01em]">{active.title}</h1>
                    <p className="mt-0.5 hidden text-muted-foreground text-sm sm:block">{active.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-end gap-2">
                  <FilterSelect
                    label="Period"
                    value={filters.period}
                    options={periodOptions}
                    onValueChange={(value) => setPeriod(value as PeriodValue)}
                  />
                  <FilterSelect
                    label="Region"
                    value={filters.region}
                    options={regionOptions.map((region) => ({ label: regionLabel(region), value: region }))}
                    onValueChange={(value) => setRegion(value as RegionValue)}
                  />
                  <FilterSelect
                    label="County"
                    value={filters.country}
                    options={getCountyOptions(filters.region).map((county) => ({ label: county, value: county }))}
                    onValueChange={(value) => updateFilter("country", value)}
                  />
                  <Button onClick={openBrief} className="self-end">
                    <FileText />
                    Board brief
                  </Button>
                </div>
              </div>
            </header>

            <main className="min-w-0 px-4 pt-6 pb-12 sm:px-6 lg:px-8">
              <ViewRouter
                view={view}
                data={data}
                filters={filters}
                onFilter={updateFilter}
                onOpenBrief={openBrief}
              />
            </main>

            <footer className="mt-auto border-t px-4 py-4 text-muted-foreground text-xs sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>Afriquity × Global Alliance for Communities · executive briefing</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5" />
                  Updated {formatAsOfDate()}
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent
          side="left"
          className="bg-[linear-gradient(176deg,var(--color-royal-950)_0%,var(--color-ink)_78%)] text-sidebar-foreground"
          closeProps={{ className: "text-white/80 hover:bg-white/10" }}
        >
          <div className="flex h-full flex-col p-4">
            <BrandMark />
            <nav className="mt-6 flex flex-1 flex-col gap-1">
              <NavList
                view={view}
                onSelect={(id) => {
                  setView(id);
                  setNavOpen(false);
                }}
              />
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <BoardBriefSheet open={briefOpen} onOpenChange={setBriefOpen} data={data} />
    </TooltipProvider>
  );
}

// ----------------------------------------------------------------------------
// Shell
// ----------------------------------------------------------------------------

function BrandMark({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 px-1", collapsed && "justify-center px-0")}>
      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-gold-500 font-heading font-semibold text-ink text-sm shadow-[0_4px_14px_-4px_rgba(245,168,0,0.65)]">
        GA
      </div>
      {!collapsed && (
        <div className="leading-tight">
          <p className="font-heading font-semibold text-sm text-white">GAC Impact</p>
          <p className="text-[11px] text-white/55">Intelligence · by Afriquity</p>
        </div>
      )}
    </div>
  );
}

function SidebarCollapseButton({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const Icon = collapsed ? PanelLeftOpen : PanelLeftClose;
  const label = collapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="border-white/10 text-white/65 hover:bg-white/10 hover:text-white data-pressed:bg-white/10"
            aria-label={label}
            onClick={onToggle}
          />
        }
      >
        <Icon className="size-4" />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function NavList({
  view,
  onSelect,
  collapsed = false,
}: {
  view: ViewId;
  onSelect: (id: ViewId) => void;
  collapsed?: boolean;
}) {
  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === view;
        const navButton = (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            aria-current={isActive ? "page" : undefined}
            aria-label={collapsed ? item.label : undefined}
            className={cn(
              "group relative flex h-9 items-center rounded-lg text-left text-sm transition-colors",
              collapsed ? "justify-center px-0" : "gap-3 px-3",
              isActive ? "bg-white/10 font-medium text-white" : "text-white/65 hover:bg-white/5 hover:text-white",
            )}
          >
            <span
              className={cn(
                "absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-gold-500 transition-opacity",
                isActive ? "opacity-100" : "opacity-0",
              )}
            />
            <Icon className="size-4.5 shrink-0 opacity-90" />
            {collapsed ? <span className="sr-only">{item.label}</span> : item.label}
          </button>
        );

        if (collapsed) {
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger render={navButton} />
              <TooltipContent>{item.label}</TooltipContent>
            </Tooltip>
          );
        }

        return navButton;
      })}
    </>
  );
}

function ViewRouter({
  view,
  data,
  filters,
  onFilter,
  onOpenBrief,
}: {
  view: ViewId;
  data: DashboardData;
  filters: DashboardFilters;
  onFilter: FilterSetter;
  onOpenBrief: () => void;
}) {
  switch (view) {
    case "network":
      return <NetworkView data={data} filters={filters} onFilter={onFilter} />;
    case "projects":
      return <ProjectsView data={data} filters={filters} onFilter={onFilter} />;
    case "funding":
      return <FundingView data={data} filters={filters} onFilter={onFilter} />;
    case "impact":
      return <ImpactView data={data} />;
    case "regions":
      return <RegionsView data={data} />;
    case "reports":
      return <ReportsView onOpenBrief={onOpenBrief} />;
    case "data":
      return <DataQualityView data={data} />;
    default:
      return <OverviewView data={data} />;
  }
}

// ----------------------------------------------------------------------------
// Views
// ----------------------------------------------------------------------------

function OverviewView({ data }: { data: DashboardData }) {
  const s = data.summary;
  const fundsDeployed = s.grantsDisbursed + s.loansDisbursed;

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          accent
          icon={Users}
          label="People reached"
          value={formatCompact(s.peopleReached)}
          detail={`${formatCompact(s.householdsReached)} households`}
          delta={{ value: 12.4 }}
          tooltip={metricDefinitions.peopleReached}
        />
        <KpiCard
          icon={NetworkIcon}
          label="Active CBOs"
          value={formatNumber(s.activeCbos)}
          detail={`${formatNumber(s.activeCountries)} counties active`}
          delta={{ value: 6, suffix: "" }}
          tooltip={metricDefinitions.activeCbos}
        />
        <KpiCard
          icon={HandCoins}
          label="Funds deployed"
          value={formatCurrency(fundsDeployed)}
          detail="grants + loans"
          delta={{ value: 8.1 }}
          tooltip={metricDefinitions.fundsDeployed}
        />
        <KpiCard
          icon={BadgeCheck}
          label="Repayment rate"
          value={formatPercent(s.repaymentRate)}
          detail={`${formatCurrency(s.outstandingLoans)} outstanding`}
          delta={{ value: 1.8 }}
          tooltip={metricDefinitions.repayment}
        />
        <KpiCard
          icon={CircleAlert}
          label="Projects at risk"
          value={formatNumber(s.projectsAtRisk)}
          detail={`${formatNumber(s.completedProjects)} completed`}
          tone="warning"
          delta={{ value: -2, suffix: "", goodWhenUp: false }}
          tooltip={metricDefinitions.risk}
        />
        <KpiCard
          icon={Target}
          label="Funding gap"
          value={formatCurrency(s.fundingGap)}
          detail="unfunded need"
          tone="warning"
          delta={{ value: -9.2, goodWhenUp: false }}
          tooltip={metricDefinitions.gap}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title="Funding trajectory"
          description="Grants, loans, and repayments over the last 12 months."
          footer={<InsightCallout>{repaymentInsight(data)}</InsightCallout>}
        >
          <TrendChart data={data} />
        </ChartCard>
        <NeedsAttention alerts={data.alerts} />
      </section>

      <Card>
        <div className="flex flex-col gap-0.5 p-5 pb-3">
          <h3 className="font-semibold text-sm">County operating picture</h3>
          <p className="text-muted-foreground text-sm">
            Activity concentration by county; bubble size reflects people reached.
          </p>
        </div>
        <div className="grid gap-6 px-5 pb-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <ImpactMap data={data} />
          <TopCounties data={data} />
        </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Project portfolio mix"
          description="Share of active community-led projects by theme."
          footer={<InsightCallout>{fundingGapInsight(data)}</InsightCallout>}
        >
          <BarList
            items={data.projectMix.map((item) => ({
              label: item.name,
              value: item.projects,
              meta: `${item.projects} projects · ${item.value}%`,
            }))}
          />
        </ChartCard>
        <ChartCard
          title="Funding by region"
          description="Disbursed grants plus loan principal."
          footer={<InsightCallout>{regionalInsight(data)}</InsightCallout>}
        >
          <RegionFundingChart data={data} />
        </ChartCard>
      </section>
    </div>
  );
}

function NetworkView({
  data,
  filters,
  onFilter,
}: {
  data: DashboardData;
  filters: DashboardFilters;
  onFilter: FilterSetter;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Organization | null>(null);
  const s = data.summary;

  const members = data.organizations
    .filter((organization) => {
      const term = query.trim().toLowerCase();
      if (!term) return true;
      return (
        organization.name.toLowerCase().includes(term) ||
        organization.country.toLowerCase().includes(term) ||
        organization.countyOrState.toLowerCase().includes(term)
      );
    })
    .slice()
    .sort((a, b) => b.engagementScore - a.engagementScore);

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={Users} label="Member organizations" value={formatNumber(s.memberOrganizations)} detail={`${formatNumber(s.countriesRepresented)} counties`} />
        <KpiCard icon={Activity} label="Active CBOs" value={formatNumber(s.activeCbos)} detail={`${formatNumber(s.newMembers)} new this period`} />
        <KpiCard icon={CircleAlert} label="Dormant members" value={formatNumber(s.dormantMembers)} detail="re-engagement candidates" tone="warning" />
        <KpiCard icon={BadgeCheck} label="Avg engagement" value={formatPercent(s.engagementScore)} detail={`${formatPercent(s.reportingCompleteness)} reporting`} />
      </section>

      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Network health</CardTitle>
            <CardDescription>Engagement and reporting signals.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <LabeledProgress label="Average engagement" value={s.engagementScore} />
            <LabeledProgress label="Reporting completeness" value={s.reportingCompleteness} tone="success" />
            <Separator />
            <div className="grid grid-cols-3 gap-2">
              <TinyStat label="Members" value={formatNumber(s.memberOrganizations)} />
              <TinyStat label="New" value={formatNumber(s.newMembers)} />
              <TinyStat label="Dormant" value={formatNumber(s.dormantMembers)} />
            </div>
          </CardContent>
        </Card>

        <Card className="flex min-w-0 flex-col">
          <div className="flex flex-col gap-3 p-5 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-sm">Member directory</h3>
              <p className="text-muted-foreground text-sm">{members.length} CBOs · select a row for the profile.</p>
            </div>
            <div className="flex items-end gap-2">
              <SearchInput value={query} onChange={setQuery} placeholder="Search members" />
              <FilterSelect
                label="Status"
                value={filters.memberStatus}
                options={memberStatusOptions}
                onValueChange={(value) => onFilter("memberStatus", value as MemberStatus)}
              />
            </div>
          </div>
          <div className="min-w-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CBO</TableHead>
                  <TableHead>County</TableHead>
                  <TableHead>Focus</TableHead>
                  <TableHead className="text-right">Engagement</TableHead>
                  <TableHead>Reporting</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.slice(0, 10).map((organization) => (
                  <TableRow
                    key={organization.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(organization)}
                  >
                    <TableCell className="max-w-[18rem] truncate font-medium">{organization.name}</TableCell>
                    <TableCell className="text-muted-foreground">{organization.country}</TableCell>
                    <TableCell className="text-muted-foreground">{organization.focusAreas[0]}</TableCell>
                    <TableCell className="text-right tabular-nums">{Math.round(organization.engagementScore)}</TableCell>
                    <TableCell><StatusChip status={organization.reportingStatus} /></TableCell>
                    <TableCell><StatusChip status={organization.status} /></TableCell>
                  </TableRow>
                ))}
                {members.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <p className="py-8 text-center text-muted-foreground text-sm">No members match your search.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <MemberDrawer organization={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function ProjectsView({
  data,
  filters,
  onFilter,
}: {
  data: DashboardData;
  filters: DashboardFilters;
  onFilter: FilterSetter;
}) {
  const [sortBy, setSortBy] = useState("risk");
  const activeProjects = data.projects.filter((project) => project.status === "active" || project.status === "at_risk");
  const atRisk = data.projects.filter((project) => project.status === "at_risk" || project.riskLevel === "high");
  const projectBudget = data.projects.reduce((total, project) => total + project.budgetUsd, 0);
  const projectDisbursed = data.projects.reduce((total, project) => total + project.disbursedUsd, 0);
  const averageCompletion =
    data.projects.length > 0
      ? data.projects.reduce((total, project) => total + project.completionPct, 0) / data.projects.length
      : 0;
  const fundingUtilization = projectBudget > 0 ? (projectDisbursed / projectBudget) * 100 : 0;
  const sortedProjects = data.projects.slice().sort((a, b) => {
    if (sortBy === "reach") return b.peopleReached - a.peopleReached;
    if (sortBy === "completion") return b.completionPct - a.completionPct;

    return riskRank(b.riskLevel) - riskRank(a.riskLevel) || a.completionPct - b.completionPct;
  });
  const followUpProjects = atRisk.slice(0, 3);
  const remainingFollowUps = Math.max(0, atRisk.length - followUpProjects.length);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-end gap-2">
        <FilterSelect
          label="Project type"
          value={filters.projectType}
          options={[
            { label: "All project types", value: "All project types" },
            ...projectThemes.map((theme) => ({ label: theme, value: theme })),
          ]}
          onValueChange={(value) => onFilter("projectType", value)}
        />
        <FilterSelect
          label="Sort"
          value={sortBy}
          options={[
            { label: "Risk first", value: "risk" },
            { label: "Highest reach", value: "reach" },
            { label: "Most complete", value: "completion" },
          ]}
          onValueChange={setSortBy}
        />
        <Button
          variant="outline"
          className="self-end"
          render={
            <a
              href={projectPortfolioReport.artifact.href}
              download={projectPortfolioReport.artifact.fileName}
            />
          }
        >
          <Download />
          Report PPTX
        </Button>
        <Button
          variant="outline"
          className="self-end"
          render={
            <a
              href={projectPortfolioReport.artifact.pdf.href}
              download={projectPortfolioReport.artifact.pdf.fileName}
            />
          }
        >
          <Download />
          Report PDF
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={Target}
          label="Active projects"
          value={formatNumber(activeProjects.length)}
          detail={`${formatNumber(data.summary.completedProjects)} completed`}
        />
        <KpiCard
          icon={CircleAlert}
          label="Projects at risk"
          value={formatNumber(atRisk.length)}
          detail={`${formatNumber(atRisk.filter((project) => project.riskLevel === "high").length)} high risk`}
          tone="warning"
        />
        <KpiCard
          icon={BadgeCheck}
          label="Avg completion"
          value={formatPercent(averageCompletion)}
          detail="across selected portfolio"
        />
        <KpiCard
          icon={HandCoins}
          label="Funding utilization"
          value={formatPercent(fundingUtilization)}
          detail={`${formatCurrency(projectDisbursed)} disbursed`}
        />
      </section>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        <ChartCard
          className="h-fit"
          title="Project portfolio mix"
          description="Active projects by Kenya-relevant theme."
          footer={<InsightCallout>{fundingGapInsight(data)}</InsightCallout>}
        >
          <BarList
            items={data.projectMix.map((item) => ({
              label: item.name,
              value: item.projects,
              meta: `${item.projects} projects · ${item.value}%`,
            }))}
          />
        </ChartCard>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Follow-up queue</CardTitle>
            <CardDescription>Highest-risk project signals.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {followUpProjects.map((project) => (
              <div key={project.id} className="grid min-w-0 gap-2 rounded-xl border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-sm">{project.name}</p>
                    <p className="text-muted-foreground text-xs">{project.country} County · {project.theme}</p>
                  </div>
                  <StatusChip status={project.riskLevel} />
                </div>
                <LabeledProgress label="Completion" value={project.completionPct} tone="gold" />
              </div>
            ))}
            {remainingFollowUps > 0 && (
              <div className="rounded-xl border border-dashed px-3 py-2 text-muted-foreground text-xs">
                {formatNumber(remainingFollowUps)} more follow-up items are listed in the project portfolio table.
              </div>
            )}
            {atRisk.length === 0 && (
              <p className="py-6 text-center text-muted-foreground text-sm">No project risk flags in this view.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="flex min-w-0 flex-col">
        <div className="flex flex-col gap-0.5 p-5 pb-3">
          <h3 className="font-semibold text-sm">Project portfolio</h3>
          <p className="text-muted-foreground text-sm">Status, county reach, completion, and utilization.</p>
        </div>
        <div className="min-w-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>County</TableHead>
                <TableHead>Theme</TableHead>
                <TableHead className="text-right">Completion</TableHead>
                <TableHead className="text-right">People reached</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProjects.slice(0, 12).map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="max-w-[18rem] truncate font-medium">{project.name}</TableCell>
                  <TableCell className="text-muted-foreground">{project.country}</TableCell>
                  <TableCell className="max-w-[14rem] truncate text-muted-foreground">{project.theme}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatPercent(project.completionPct)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatCompact(project.peopleReached)}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatPercent(share(project.disbursedUsd, project.budgetUsd))}
                  </TableCell>
                  <TableCell><StatusChip status={project.riskLevel} /></TableCell>
                  <TableCell><StatusChip status={project.status} /></TableCell>
                </TableRow>
              ))}
              {sortedProjects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <p className="py-8 text-center text-muted-foreground text-sm">No projects match the selected filters.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function FundingView({
  data,
  filters,
  onFilter,
}: {
  data: DashboardData;
  filters: DashboardFilters;
  onFilter: FilterSetter;
}) {
  const s = data.summary;

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground text-sm">Grants and loans deployed to Kenyan member CBOs.</p>
        <FilterSelect
          label="Funding type"
          value={filters.fundingType}
          options={fundingTypeOptions.map((type) => ({ label: type, value: type }))}
          onValueChange={(value) => onFilter("fundingType", value as FundingType)}
        />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={HandCoins} label="Grants awarded" value={formatCurrency(s.grantsAwarded)} detail={`${formatNumber(s.grantRecipients)} recipients`} />
        <KpiCard icon={Target} label="Avg grant size" value={formatCurrency(s.averageGrantSize)} detail={`${formatCurrency(s.grantsDisbursed)} disbursed`} />
        <KpiCard icon={Landmark} label="Loans disbursed" value={formatCurrency(s.loansDisbursed)} detail={`${formatCurrency(s.loanRepayments)} repaid`} />
        <KpiCard icon={CircleAlert} label="Outstanding balance" value={formatCurrency(s.outstandingLoans)} detail={`${formatNumber(s.overdueLoans)} overdue`} tone="warning" />
      </section>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <ChartCard
          title="Funding by region"
          description="Disbursed grants plus loan principal across Kenya regions."
          footer={<InsightCallout>{regionalInsight(data)}</InsightCallout>}
        >
          <RegionFundingChart data={data} />
        </ChartCard>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Loan position</CardTitle>
            <CardDescription>Repayment and outstanding balance.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-3 gap-2">
              <TinyStat label="Disbursed" value={formatCurrency(s.loansDisbursed)} />
              <TinyStat label="Repaid" value={formatCurrency(s.loanRepayments)} />
              <TinyStat label="Open" value={formatCurrency(s.outstandingLoans)} />
            </div>
            <LabeledProgress label="Repayment rate" value={s.repaymentRate} tone="success" />
            <Badge variant={s.overdueLoans ? "warning" : "success"} className="w-fit">
              {formatNumber(s.overdueLoans)} overdue · {formatNumber(s.loansDueSoon)} due soon
            </Badge>
          </CardContent>
        </Card>
      </div>

      <ChartCard
        title="Loan repayment aging"
        description="Outstanding balances by repayment bucket."
        footer={<InsightCallout>{repaymentInsight(data)}</InsightCallout>}
      >
        <div className="grid gap-3 pt-1">
          <BarList
            items={data.loanAging.map((bucket) => ({
              label: bucket.bucket,
              value: bucket.outstanding,
              meta: `${formatNumber(bucket.count)} · ${formatCurrency(bucket.outstanding)}`,
            }))}
            accent={(index) => agingColor(index)}
          />
        </div>
      </ChartCard>
    </div>
  );
}

function ImpactView({ data }: { data: DashboardData }) {
  const s = data.summary;
  const byTheme = data.projectMix
    .slice()
    .sort((a, b) => b.people - a.people)
    .map((item) => ({ label: item.name, value: item.people, meta: formatCompact(item.people) }));

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard accent icon={Users} label="People reached" value={formatCompact(s.peopleReached)} tooltip={metricDefinitions.peopleReached} />
        <KpiCard icon={Activity} label="Households" value={formatCompact(s.householdsReached)} />
        <KpiCard icon={Users} label="Women reached" value={formatCompact(s.womenReached)} />
        <KpiCard icon={Users} label="Youth reached" value={formatCompact(s.youthReached)} />
        <KpiCard icon={Target} label="Jobs supported" value={formatNumber(s.jobsSupported)} />
        <KpiCard icon={BadgeCheck} label="Leaders supported" value={formatNumber(s.leadersSupported)} />
      </section>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <ChartCard title="Reach by project theme" description="Estimated people reached across active themes.">
          <BarList items={byTheme} />
        </ChartCard>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Population reach</CardTitle>
            <CardDescription>Share of people reached by group (estimated).</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <LabeledProgress label="Women & girls" value={share(s.womenReached, s.peopleReached)} />
            <LabeledProgress label="Youth" value={share(s.youthReached, s.peopleReached)} tone="gold" />
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <TinyStat label="Jobs / livelihoods" value={formatNumber(s.jobsSupported)} />
              <TinyStat label="Community leaders" value={formatNumber(s.leadersSupported)} />
            </div>
          </CardContent>
        </Card>
      </div>

      <section>
        <SectionHeader title="Community spotlights" description="Short evidence notes from selected counties." />
        <div className="grid gap-4 lg:grid-cols-3">
          {impactStories.map((story) => (
            <Card key={story.title} className="flex flex-col">
              <CardHeader>
                <Badge variant="secondary" className="mb-1 w-fit">{story.country}</Badge>
                <CardTitle className="text-pretty text-base leading-6">{story.title}</CardTitle>
                <CardDescription>{story.theme}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-muted-foreground text-sm leading-6">{story.summary}</p>
                <div className="mt-4 flex items-center gap-2 border-t pt-3 font-medium text-sm">
                  <TrendingUp className="size-4 text-primary" />
                  {story.metric}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function RegionsView({ data }: { data: DashboardData }) {
  const regions = data.regionalSummary;
  const leader = regions[0];
  const reachItems = regions
    .slice()
    .sort((a, b) => b.peopleReached - a.peopleReached)
    .map((region) => ({ label: region.region, value: region.peopleReached, meta: formatCompact(region.peopleReached) }));

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={Globe2} label="Counties active" value={formatNumber(data.summary.activeCountries)} detail={`${formatNumber(regions.length)} regions`} />
        <KpiCard icon={Users} label="Top region by reach" value={leader?.region ?? "—"} detail={leader ? `${formatCompact(leader.peopleReached)} people` : "no activity"} />
        <KpiCard icon={HandCoins} label="Funds deployed" value={formatCurrency(data.summary.grantsDisbursed + data.summary.loansDisbursed)} detail="grants + loans" />
        <KpiCard icon={CircleAlert} label="Projects at risk" value={formatNumber(data.summary.projectsAtRisk)} detail="across regions" tone="warning" />
      </section>

      <Card className="flex min-w-0 flex-col">
        <div className="flex flex-col gap-0.5 p-5 pb-3">
          <h3 className="font-semibold text-sm">County and regional performance</h3>
          <p className="text-muted-foreground text-sm">Reach, footprint, and funding by Kenya region.</p>
        </div>
        <div className="min-w-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead className="text-right">Counties</TableHead>
                <TableHead className="text-right">Active CBOs</TableHead>
                <TableHead className="text-right">Projects</TableHead>
                <TableHead className="text-right">People reached</TableHead>
                <TableHead className="text-right">Funds deployed</TableHead>
                <TableHead className="text-right">At risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regions.map((region) => (
                <TableRow key={region.region}>
                  <TableCell className="font-medium">{region.region}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNumber(region.countries)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNumber(region.activeCbos)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNumber(region.activeProjects)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatCompact(region.peopleReached)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatCurrency(region.fundsDeployed)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNumber(region.projectsAtRisk)}</TableCell>
                </TableRow>
              ))}
              {regions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <p className="py-8 text-center text-muted-foreground text-sm">No county activity in this view.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <div className="flex flex-col gap-0.5 p-5 pb-3">
            <h3 className="font-semibold text-sm">County footprint map</h3>
            <p className="text-muted-foreground text-sm">Bubble size reflects people reached.</p>
          </div>
          <div className="px-5 pb-5">
            <ImpactMap data={data} />
          </div>
        </Card>
        <ChartCard title="Reach by region" footer={<InsightCallout>{regionalInsight(data)}</InsightCallout>}>
          <div className="pt-1">
            <BarList items={reachItems} valueFormat={formatCompact} />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

function ReportsView({ onOpenBrief }: { onOpenBrief: () => void }) {
  return (
    <div className="grid gap-6">
      <SectionHeader
        title="Donor- and board-ready reports"
        description="Download PowerPoint reports built from this dashboard data. Preview opens a narrative brief."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reportTemplates.map((template) => (
          <Card key={template.title} className="flex flex-col">
            <CardHeader>
              <span className="mb-1 grid size-9 place-items-center rounded-lg bg-primary/8 text-primary">
                <FileText className="size-4.5" />
              </span>
              <CardTitle className="text-base leading-6">{template.title}</CardTitle>
              <CardDescription>{template.audience}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <p className="text-muted-foreground text-sm leading-6">{template.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {template.defaultFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" size="sm">{filter}</Badge>
                ))}
              </div>
              <p className="text-muted-foreground text-xs">
                {template.artifact.slideCount} slides · {template.artifact.format} {template.artifact.sizeLabel} · PDF {template.artifact.pdf.sizeLabel}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-1">
                <Button variant="outline" size="sm" onClick={onOpenBrief}>Preview</Button>
                <Button
                  variant="ghost"
                  size="sm"
                  render={
                    <a
                      href={template.artifact.href}
                      download={template.artifact.fileName}
                    />
                  }
                >
                  <Download />
                  PPTX
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  render={
                    <a
                      href={template.artifact.pdf.href}
                      download={template.artifact.pdf.fileName}
                    />
                  }
                >
                  <Download />
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DataQualityView({ data }: { data: DashboardData }) {
  const overdueReports = data.organizations.filter((organization) => organization.reportingStatus === "overdue").length;
  const openIssues = dataIssues.filter((issue) => issue.status !== "resolved").length;

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="flex flex-col justify-center p-6 text-center">
          <p className="text-muted-foreground text-sm">Overall data quality</p>
          <p className="mt-2 font-heading font-semibold text-5xl text-primary tabular-nums">
            {formatPercent(data.summary.dataCompletenessScore)}
          </p>
          <p className="mt-2 text-muted-foreground text-sm">
            Confidence is reduced mainly by overdue member reports and unverified reach figures.
          </p>
          <div className="mt-5">
            <LabeledProgress label="Reporting completeness" value={data.summary.reportingCompleteness} tone="success" />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <TinyStat label="Records flagged" value={formatNumber(dataIssues.length)} />
          <TinyStat label="Open issues" value={formatNumber(openIssues)} />
          <TinyStat label="Overdue reports" value={formatNumber(overdueReports)} />
          <TinyStat label="Member orgs" value={formatNumber(data.summary.memberOrganizations)} />
          <TinyStat label="Counties active" value={formatNumber(data.summary.activeCountries)} />
          <TinyStat label="Last sync" value={formatAsOfDate()} />
        </div>
      </div>

      <Card className="flex min-w-0 flex-col">
        <div className="flex flex-col gap-0.5 p-5 pb-3">
          <h3 className="font-semibold text-sm">Records needing attention</h3>
          <p className="text-muted-foreground text-sm">Validation flags raised across recent uploads and member reports.</p>
        </div>
        <div className="min-w-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataIssues.map((issue) => (
                <TableRow key={`${issue.record}-${issue.issue}`}>
                  <TableCell className="max-w-[16rem] truncate font-medium">{issue.record}</TableCell>
                  <TableCell className="text-muted-foreground">{issue.owner}</TableCell>
                  <TableCell className="max-w-[22rem] truncate text-muted-foreground">{issue.issue}</TableCell>
                  <TableCell><StatusChip status={issue.severity} /></TableCell>
                  <TableCell><StatusChip status={issue.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Primitives
// ----------------------------------------------------------------------------

function KpiCard({
  icon: Icon,
  label,
  value,
  detail,
  delta,
  tone = "default",
  accent = false,
  tooltip,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail?: string;
  delta?: { value: number; goodWhenUp?: boolean; suffix?: string };
  tone?: "default" | "warning";
  accent?: boolean;
  tooltip?: string;
}) {
  return (
    <Card className={cn("relative overflow-hidden", accent && "ring-1 ring-gold-200")}>
      {accent && <span className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,var(--color-gold-500),var(--color-gold-700))]" />}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "grid size-9 place-items-center rounded-lg",
              tone === "warning" ? "bg-warning/12 text-warning-foreground" : "bg-primary/8 text-primary",
            )}
          >
            <Icon className="size-4.5" />
          </span>
          {tooltip && <InfoDot text={tooltip} label={label} />}
        </div>
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="mt-1 font-heading font-semibold text-3xl tabular-nums tracking-[-0.02em]">{value}</p>
        </div>
        {(delta || detail) && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {delta && <DeltaChip value={delta.value} goodWhenUp={delta.goodWhenUp} suffix={delta.suffix} />}
            {detail && <span className="text-muted-foreground text-xs">{detail}</span>}
          </div>
        )}
      </div>
    </Card>
  );
}

function DeltaChip({ value, goodWhenUp = true, suffix = "%" }: { value: number; goodWhenUp?: boolean; suffix?: string }) {
  const up = value >= 0;
  const good = up === goodWhenUp;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium text-xs tabular-nums",
        good ? "bg-success/10 text-success-foreground" : "bg-destructive/10 text-destructive-foreground",
      )}
    >
      <Icon className="size-3" />
      {up ? "+" : "-"}
      {Math.abs(value)}
      {suffix}
    </span>
  );
}

function InfoDot({ text, label }: { text: string; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={`${label} definition`}
            className="text-muted-foreground/70 transition-colors hover:text-foreground"
          />
        }
      >
        <Info className="size-4" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[240px] leading-5">{text}</TooltipContent>
    </Tooltip>
  );
}

function SectionHeader({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-heading font-semibold text-lg tracking-[-0.01em]">{title}</h2>
        {description && <p className="mt-0.5 max-w-2xl text-muted-foreground text-sm">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function ChartCard({
  title,
  description,
  footer,
  children,
  className,
}: {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <div className="flex flex-col gap-0.5 p-5 pb-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      <div className="px-3 pb-3 sm:px-4">{children}</div>
      {footer && (
        <div className="mt-auto border-t px-5 py-3 text-muted-foreground text-xs leading-5">{footer}</div>
      )}
    </Card>
  );
}

function InsightCallout({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-start gap-2">
      <TrendingUp className="mt-0.5 size-3.5 shrink-0 text-primary" />
      <span>{children}</span>
    </span>
  );
}

function NeedsAttention({ alerts }: { alerts: AlertItem[] }) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center gap-2.5 p-5 pb-3">
        <span className="grid size-8 place-items-center rounded-lg bg-warning/12 text-warning-foreground">
          <AlertTriangle className="size-4" />
        </span>
        <div>
          <h3 className="font-semibold text-sm">Needs attention</h3>
          <p className="text-muted-foreground text-xs">Priorities for leadership follow-up.</p>
        </div>
      </div>
      <div className="grid gap-2 px-4 pb-4">
        {alerts.slice(0, 4).map((alert) => (
          <PriorityItem key={alert.title} alert={alert} />
        ))}
      </div>
    </Card>
  );
}

function PriorityItem({ alert }: { alert: AlertItem }) {
  const dot =
    alert.severity === "high" ? "bg-destructive" : alert.severity === "medium" ? "bg-warning" : "bg-success";
  return (
    <div className="flex gap-3 rounded-xl border bg-card p-3">
      <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", dot)} />
      <div className="min-w-0">
        <p className="font-medium text-sm leading-5">{alert.title}</p>
        <p className="mt-0.5 text-muted-foreground text-xs leading-5">{alert.detail}</p>
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const meta = statusMeta[status] ?? { label: statusLabel(status), variant: "secondary" as BadgeVariant };
  return (
    <Badge variant={meta.variant} size="sm">
      {meta.label}
    </Badge>
  );
}

function BarList({
  items,
  valueFormat = formatNumber,
  accent,
}: {
  items: { label: string; value: number; meta?: string }[];
  valueFormat?: (value: number) => string;
  accent?: (index: number) => string;
}) {
  const max = Math.max(1, ...items.map((item) => item.value));
  return (
    <div className="grid gap-3 px-2 py-1">
      {items.length === 0 && <p className="py-6 text-center text-muted-foreground text-sm">No data in this view.</p>}
      {items.map((item, index) => (
        <div key={item.label} className="grid gap-1.5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="truncate font-medium">{item.label}</span>
            <span className="shrink-0 text-muted-foreground tabular-nums">{item.meta ?? valueFormat(item.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full"
              style={{ width: `${(item.value / max) * 100}%`, background: accent ? accent(index) : "var(--chart-1)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function LabeledProgress({
  label,
  value,
  tone = "primary",
}: {
  label: string;
  value: number;
  tone?: "primary" | "success" | "gold";
}) {
  const bar = tone === "success" ? "bg-success" : tone === "gold" ? "bg-gold-500" : "bg-primary";
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground tabular-nums">{formatPercent(value)}</span>
      </div>
      <Progress value={value}>
        <ProgressTrack>
          <ProgressIndicator className={bar} />
        </ProgressTrack>
      </Progress>
    </div>
  );
}

function TinyStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-muted/40 p-3 text-center">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="mt-1 font-heading font-semibold text-lg tabular-nums tracking-[-0.02em]">{value}</p>
    </div>
  );
}

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-8 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs/5 outline-none ring-ring/24 transition-shadow placeholder:text-muted-foreground/72 focus-visible:border-ring focus-visible:ring-[3px] sm:w-48"
    />
  );
}

function FilterSelect({
  label,
  value,
  options,
  onValueChange,
}: {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-1">
      {label && <span className="font-medium text-muted-foreground text-xs">{label}</span>}
      <Select items={options} value={value} onValueChange={(next) => next != null && onValueChange(String(next))}>
        <SelectTrigger className="h-8 min-w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Charts
// ----------------------------------------------------------------------------

type TooltipPayloadItem = { name?: string; value?: number | string; color?: string; dataKey?: string | number };

function ChartTip({
  active,
  label,
  payload,
  format,
}: {
  active?: boolean;
  label?: string;
  payload?: TooltipPayloadItem[];
  format?: (value: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-popover p-3 shadow-lg">
      {label && <p className="mb-2 font-medium text-xs">{label}</p>}
      <div className="grid gap-1.5">
        {payload.map((item) => (
          <div key={String(item.dataKey)} className="flex items-center justify-between gap-6 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <span className="font-medium tabular-nums">
              {format ? format(Number(item.value)) : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendChart({ data }: { data: DashboardData }) {
  return (
    <ResponsiveChart height={300}>
      {(width) => (
        <LineChart width={width} height={300} data={data.monthlyTrend} margin={{ top: 12, right: 12, left: 4, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={8} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={64}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickFormatter={(value) => formatCurrency(Number(value))}
          />
          <RechartsTooltip
            cursor={{ stroke: "var(--border)" }}
            content={(props: any) => <ChartTip {...props} format={(value) => formatCurrency(value)} />}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} iconType="plainline" />
          <Line dataKey="grants" name="Grants" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} type="monotone" />
          <Line dataKey="loans" name="Loans" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} type="monotone" />
          <Line dataKey="repayments" name="Repayments" stroke="var(--chart-3)" strokeWidth={2.5} dot={false} type="monotone" />
        </LineChart>
      )}
    </ResponsiveChart>
  );
}

function RegionFundingChart({ data }: { data: DashboardData }) {
  const rows = data.fundingByRegion.slice(0, 6);
  const max = Math.max(0, ...rows.map((row) => row.amount));

  return (
    <ResponsiveChart height={300}>
      {(width) => (
        <BarChart width={width} height={300} data={rows} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" horizontal={false} />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickFormatter={(value) => formatCurrency(Number(value))}
          />
          <YAxis type="category" dataKey="region" axisLine={false} tickLine={false} width={104} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
          <RechartsTooltip
            cursor={{ fill: "var(--muted)" }}
            content={(props: any) => <ChartTip {...props} format={(value) => formatCurrency(value)} />}
          />
          <Bar dataKey="amount" name="Funds deployed" radius={[0, 6, 6, 0]} barSize={18}>
            {rows.map((row) => (
              <Cell key={row.region} fill={row.amount === max ? "var(--chart-2)" : "var(--chart-1)"} />
            ))}
          </Bar>
        </BarChart>
      )}
    </ResponsiveChart>
  );
}

function ImpactMap({ data }: { data: DashboardData }) {
  const points = data.mapPoints;
  const maxPeople = Math.max(1, ...points.map((point) => point.peopleReached));
  const top = points.slice().sort((a, b) => b.peopleReached - a.peopleReached)[0];
  const bounds = { minLon: 33.4, maxLon: 41.9, minLat: -4.8, maxLat: 4.6 };

  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-xl border bg-[linear-gradient(180deg,#ffffff,#f4eee3)]">
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 68" role="img" aria-label="Kenya county reach map">
        <path
          d="M35 4 50 6 64 16 73 28 69 40 80 49 63 61 46 65 32 58 20 44 15 29 24 15Z"
          fill="var(--secondary)"
          stroke="var(--border)"
          strokeWidth="0.45"
        />
        <path d="M35 4 38 23 31 38 32 58" fill="none" stroke="var(--border)" strokeWidth="0.35" opacity="0.8" />
        <path d="M24 15 43 28 64 16" fill="none" stroke="var(--border)" strokeWidth="0.35" opacity="0.8" />
        <path d="M31 38 52 39 69 40" fill="none" stroke="var(--border)" strokeWidth="0.35" opacity="0.8" />
        <path d="M46 65 52 39 80 49" fill="none" stroke="var(--border)" strokeWidth="0.35" opacity="0.8" />
        {points.map((point) => {
          const cx = ((point.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 72 + 14;
          const cy = ((bounds.maxLat - point.lat) / (bounds.maxLat - bounds.minLat)) * 58 + 5;
          const radius = 1.4 + Math.sqrt(point.peopleReached / maxPeople) * 5.8;
          const isTop = top && point.country === top.country;
          return (
            <circle
              key={point.country}
              cx={cx}
              cy={cy}
              r={radius}
              fill={isTop ? "var(--chart-2)" : "var(--chart-1)"}
              opacity={isTop ? 0.85 : 0.62}
              stroke="var(--card)"
              strokeWidth={0.4}
              aria-label={`${point.country}, ${formatCompact(point.peopleReached)} people reached`}
            />
          );
        })}
      </svg>
      <div className="absolute bottom-3 left-3 rounded-lg border bg-background/92 px-3 py-2 text-xs shadow-xs backdrop-blur">
        <p className="font-medium">{formatNumber(data.summary.activeCountries)} active counties</p>
        <p className="text-muted-foreground">{formatCompact(data.summary.peopleReached)} people reached</p>
      </div>
    </div>
  );
}

function TopCounties({ data }: { data: DashboardData }) {
  const counties = data.mapPoints
    .slice()
    .sort((a, b) => b.peopleReached - a.peopleReached)
    .slice(0, 5);
  const max = Math.max(1, ...counties.map((county) => county.peopleReached));

  return (
    <div className="grid content-start gap-3">
      <p className="font-semibold text-sm">Highest county reach</p>
      {counties.length === 0 && <p className="text-muted-foreground text-sm">No activity in this view.</p>}
      {counties.map((county, index) => (
        <div key={county.country} className="grid gap-1.5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-3 text-muted-foreground text-xs tabular-nums">{index + 1}</span>
              {county.country}
            </span>
            <span className="text-muted-foreground tabular-nums">{formatCompact(county.peopleReached)}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${(county.peopleReached / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ResponsiveChart({ height = 300, children }: { height?: number; children: (width: number) => ReactNode }) {
  const ready = useClientReady();
  const { ref, width } = useChartWidth(ready);

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      {ready && width ? children(width) : <ChartSkeleton height={height} />}
    </div>
  );
}

function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="flex flex-col justify-end gap-3 p-4" style={{ height }}>
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  );
}

// ----------------------------------------------------------------------------
// Drawers
// ----------------------------------------------------------------------------

function MemberDrawer({ organization, onClose }: { organization: Organization | null; onClose: () => void }) {
  return (
    <Sheet open={Boolean(organization)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" variant="inset">
        {organization && <MemberDrawerBody organization={organization} />}
      </SheetContent>
    </Sheet>
  );
}

function MemberDrawerBody({ organization }: { organization: Organization }) {
  const orgProjects = projects.filter((project) => project.organizationId === organization.id);
  const orgGrants = grants.filter((grant) => grant.organizationId === organization.id);
  const orgLoans = loans.filter((loan) => loan.organizationId === organization.id);
  const funding =
    orgGrants.reduce((total, grant) => total + grant.amountDisbursedUsd, 0) +
    orgLoans.reduce((total, loan) => total + loan.principalUsd, 0);
  const reached = orgProjects.reduce((total, project) => total + project.peopleReached, 0);

  return (
    <>
      <SheetHeader>
        <div className="flex items-center gap-2">
          <StatusChip status={organization.status} />
          <StatusChip status={organization.reportingStatus} />
        </div>
        <SheetTitle className="text-pretty">{organization.name}</SheetTitle>
        <SheetDescription>
          {organization.country} County · {organization.region} · member since {formatYear(organization.memberSince)}
        </SheetDescription>
      </SheetHeader>
      <SheetPanel className="grid gap-5">
        <div className="grid grid-cols-3 gap-2">
          <TinyStat label="Projects" value={formatNumber(orgProjects.length)} />
          <TinyStat label="Funding" value={formatCurrency(funding)} />
          <TinyStat label="Reached" value={formatCompact(reached)} />
        </div>

        <div className="grid gap-2">
          <p className="font-medium text-sm">Focus areas</p>
          <div className="flex flex-wrap gap-1.5">
            {organization.focusAreas.map((area) => (
              <Badge key={area} variant="secondary" size="sm">{area}</Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-2 rounded-xl border p-3 text-sm">
          <Row label="Engagement score" value={String(Math.round(organization.engagementScore))} />
          <Row label="Support need" value={organization.supportNeed} />
          <Row label="Contact" value={organization.contactPerson} />
          <Row label="Last activity" value={formatDate(organization.lastActivityDate)} />
        </div>

        {orgProjects.length > 0 && (
          <div className="grid gap-2">
            <p className="font-medium text-sm">Active projects</p>
            <div className="grid gap-2">
              {orgProjects.slice(0, 4).map((project) => (
                <div key={project.id} className="flex items-center justify-between gap-3 rounded-xl border p-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-sm">{project.name}</p>
                    <p className="text-muted-foreground text-xs">{project.theme} · {project.completionPct}% complete</p>
                  </div>
                  <StatusChip status={project.status} />
                </div>
              ))}
            </div>
          </div>
        )}
      </SheetPanel>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function BoardBriefSheet({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: DashboardData;
}) {
  const briefRows: { label: string; value: string; icon: LucideIcon }[] = [
    { label: "Projects requiring follow-up", value: formatNumber(data.summary.projectsAtRisk), icon: CircleAlert },
    { label: "Funding gap", value: formatCurrency(data.summary.fundingGap), icon: Landmark },
    { label: "Repayment rate", value: formatPercent(data.summary.repaymentRate), icon: ShieldCheck },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" variant="inset">
        <SheetHeader>
          <Badge variant="secondary" className="mb-1 w-fit">{getPeriodLabel(data.filters.period)}</Badge>
          <SheetTitle>Board-ready narrative</SheetTitle>
        <SheetDescription>A concise summary of the dashboard data.</SheetDescription>
        </SheetHeader>
        <SheetPanel className="grid gap-5">
          <p className="text-pretty text-base leading-7">{getExecutiveNarrative(data)}</p>
          <Separator />
          <div className="grid gap-3">
            {briefRows.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between rounded-xl border p-3">
                <div className="flex items-center gap-3">
                  <Icon className="size-4 text-muted-foreground" />
                  <span className="text-sm">{label}</span>
                </div>
                <span className="font-medium text-sm tabular-nums">{value}</span>
              </div>
            ))}
          </div>
        </SheetPanel>
        <SheetFooter>
          <Button
            variant="outline"
            render={
              <a
                href={executiveImpactReport.artifact.href}
                download={executiveImpactReport.artifact.fileName}
              />
            }
          >
            <Download />
            Download PPTX
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            <BadgeCheck />
            Done
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function agingColor(index: number) {
  const colors = [
    "var(--success)",
    "var(--chart-2)",
    "var(--warning)",
    "var(--chart-6)",
    "var(--destructive)",
    "var(--destructive)",
  ];
  return colors[index] ?? "var(--chart-1)";
}

function share(part: number, whole: number) {
  if (whole <= 0) return 0;
  return (part / whole) * 100;
}

function riskRank(risk: string) {
  if (risk === "high") return 3;
  if (risk === "medium") return 2;
  return 1;
}

function formatAsOfDate() {
  return new Date(asOfDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatYear(value: string) {
  return new Date(`${value}T00:00:00Z`).getUTCFullYear().toString();
}

function useClientReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
}

function useChartWidth(enabled: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const node = ref.current;
    const updateWidth = () => setWidth(Math.max(1, Math.round(node.getBoundingClientRect().width)));
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  return { ref, width };
}
