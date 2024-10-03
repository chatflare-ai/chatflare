"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import React from "react";

export const description =
  "A bar chart showing API calls over the last 14 days";

const chartData = [
  { date: "2024-03-01", calls: 186 },
  { date: "2024-03-02", calls: 305 },
  { date: "2024-03-03", calls: 237 },
  { date: "2024-03-04", calls: 273 },
  { date: "2024-03-05", calls: 209 },
  { date: "2024-03-06", calls: 314 },
  { date: "2024-03-07", calls: 294 },
  { date: "2024-03-08", calls: 251 },
  { date: "2024-03-09", calls: 178 },
  { date: "2024-03-10", calls: 165 },
  { date: "2024-03-11", calls: 287 },
  { date: "2024-03-12", calls: 326 },
  { date: "2024-03-13", calls: 298 },
  { date: "2024-03-14", calls: 275 },
];

const chartConfig = {
  calls: {
    label: "API Calls",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ApiCallsChart({ className }: { className?: string }) {
  const totalCalls = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.calls, 0);
  }, []);

  const averageCalls = React.useMemo(() => {
    return Math.round(totalCalls / chartData.length);
  }, [totalCalls]);

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>API Calls</CardTitle>
          <CardDescription>Last 14 days</CardDescription>
        </div>
        <div className="flex flex-col items-end text-sm">
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2">Total:</span>
            <span className="font-medium">{totalCalls.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2">Avg/day:</span>
            <span className="font-medium">{averageCalls.toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="calls"
              fill="var(--color-calls)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
