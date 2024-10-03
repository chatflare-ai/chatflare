"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

export const description = "A donut chart showing document type distribution";

const chartData = [
  { type: "pdf", count: 275, fill: "hsl(var(--chart-1))" },
  { type: "docx", count: 200, fill: "hsl(var(--chart-2))" },
  { type: "xlsx", count: 187, fill: "hsl(var(--chart-3))" },
  { type: "pptx", count: 143, fill: "hsl(var(--chart-4))" },
  { type: "other", count: 95, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
  count: {
    label: "Documents",
  },
  pdf: {
    label: "PDF",
    color: "hsl(var(--chart-1))",
  },
  docx: {
    label: "Word",
    color: "hsl(var(--chart-2))",
  },
  xlsx: {
    label: "Excel",
    color: "hsl(var(--chart-3))",
  },
  pptx: {
    label: "PowerPoint",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function DocumentTypesChart({ className }: { className?: string }) {
  const totalDocuments = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Document Types Distribution</CardTitle>
        <CardDescription>Current Quarter</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalDocuments.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Documents
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
