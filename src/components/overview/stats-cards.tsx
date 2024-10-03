import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, FileText, Users, Zap } from "lucide-react";

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Users"
        value="1,234"
        change="+10% from last month"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="API Calls"
        value="45,678"
        change="+23% from last week"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Documents Processed"
        value="789"
        change="+5% from yesterday"
        icon={<FileText className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Active Projects"
        value="12"
        change="2 completed this week"
        icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
}: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}
