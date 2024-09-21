"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IncomeDetail } from "@/types/types";
import useWindowSize from "@/hooks/useWindowSize";
import IncomeCustomTooltip from "./IncomeCustomTooltip";

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function aggregateIncomeByMonth(incomeList: IncomeDetail[]) {
  const monthlyIncome = Array(12)
    .fill(0)
    .map((_, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "short" }),
      year: new Date().toLocaleString("default", { year: "numeric" }),
      amount: 0,
    }));

  incomeList.forEach(({ amount, date }) => {
    const parsedDate = new Date(
      Date.UTC(
        parseInt(date.slice(0, 4)), // year
        parseInt(date.slice(5, 7)) - 1, // month (0-based index)
        parseInt(date.slice(8, 10)), // day
      ),
    );
    const monthIndex = parsedDate.getUTCMonth();
    monthlyIncome[monthIndex].amount += parseFloat(amount);
  });

  return monthlyIncome;
}

type Props = {
  incomeList: IncomeDetail[];
  handleBarClick: (month: string, year: string) => void;
};

export function IncomeBarChart({ incomeList, handleBarClick }: Props) {
  const aggregatedData = aggregateIncomeByMonth(incomeList);
  const { width } = useWindowSize();

  return (
    <Card className="mt-8 rounded-lg border shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-normal">
          Monthly Income Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full xl:h-[280px]"
        >
          <BarChart accessibilityLayer data={aggregatedData}>
            <CartesianGrid vertical={false} />
            {(width ?? 0) > 768 && (
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
            )}

            <ChartTooltip content={<IncomeCustomTooltip />} />
            <Bar
              dataKey="amount"
              fill="var(--color-income)"
              radius={4}
              activeBar={
                <Rectangle
                  fill="#14b8a6"
                  stroke="#262626"
                  strokeWidth="2px"
                  cursor="pointer"
                />
              }
              onClick={(data) => handleBarClick(data.month, data.year)}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
