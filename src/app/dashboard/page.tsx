"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	LegendProps,
	XAxis,
	YAxis,
} from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
	type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentAnalysis } from "@/components/SentimentAnalysis";

// Sample data for the chart
const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

// Configuration for the chart
const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--primary))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--secondary))",
	},
} satisfies ChartConfig;

export default function DashboardPage() {
	return (
		<main className="flex flex-1 flex-col gap-6 p-6">
			<h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

			{/* Section for summary cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">
							Total Students
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,254</div>
						<p className="text-xs text-muted-foreground">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">
							Active Courses
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">82</div>
						<p className="text-xs text-muted-foreground">
							+5 from last semester
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">
							Recent Enrollments
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">+573</div>
						<p className="text-xs text-muted-foreground">
							+180.1% in the last 7 days
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
				{/* Section for the main chart */}
				<div className="lg:col-span-3">
					<Card>
						<CardHeader>
							<CardTitle>Enrollment Trends</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer
								config={chartConfig}
								className="min-h-[300px] w-full"
							>
								<BarChart accessibilityLayer data={chartData}>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="month"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
									/>
									<YAxis />
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent />}
									/>
									<ChartLegend
										content={
											ChartLegendContent as unknown as LegendProps["content"]
										}
									/>
									{/* ===================== */}
									<Bar
										dataKey="desktop"
										fill="var(--color-desktop)"
										radius={4}
									/>
									<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>

				{/* Section for the sentiment analysis component */}
				<div className="lg:col-span-2">
					<SentimentAnalysis />
				</div>
			</div>
		</main>
	);
}
