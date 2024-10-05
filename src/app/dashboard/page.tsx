"use client";

import * as React from "react";
import {
  DashboardSection,
  DashboardSectionHeader,
} from "@/components/shared/section";
import { StatsCards } from "@/components/overview/stats-cards";
import { ApiCallsChart } from "@/components/overview/api-calls-chart";
import { DocumentTypesChart } from "@/components/overview/document-types-chart";
import { RecentActivity } from "@/components/overview/recent-activity";
import { QuickActions } from "@/components/overview/quick-actions";

export const runtime = "edge";

export default function DashboardPage() {
  return (
    <DashboardSection>
      <DashboardSectionHeader title="Overview" />

      <main className="grid gap-4">
        <StatsCards />
        <div className="grid gap-4 lg:grid-cols-3">
          <ApiCallsChart className="lg:col-span-2" />
          <DocumentTypesChart />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <RecentActivity />
          <QuickActions />
        </div>
      </main>
    </DashboardSection>
  );
}
