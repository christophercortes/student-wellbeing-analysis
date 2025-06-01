"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import huggingFaceEmotion from "@/global/huggingFaceEmotion";

export const description = "A pie chart showing emotion distribution";

interface chartProps {
	studentName: string;
	emotions: huggingFaceEmotion[];
}

export function ChartPieLabelList({ studentName, emotions }: chartProps) {
	const chartData = emotions.map((emotion, index) => ({
		label: emotion.label,
		value: emotion.score * 100,
		fill: `var(--chart-${index + 1})`,
	}));

	const chartConfig = emotions.reduce((acc, emotion, index) => {
		return {
			...acc,
			[emotion.label]: {
				label: emotion.label.charAt(0).toUpperCase() + emotion.label.slice(1),
				color: `var(--chart-${index + 1})`,
			},
		};
	}, {} as ChartConfig);

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Emotion Distribution</CardTitle>
				<CardDescription>{studentName}'s Emotional State</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							content={<ChartTooltipContent nameKey="value" hideLabel />}
						/>
						<Pie data={chartData} dataKey="value" nameKey="label">
							<LabelList
								dataKey="label"
								className="fill-background"
								stroke="none"
								fontSize={12}
								formatter={(value: keyof typeof chartConfig) =>
									chartConfig[value]?.label
								}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 leading-none font-medium">
					Emotional Analysis <TrendingUp className="h-4 w-4" />
				</div>
				<div className="text-muted-foreground leading-none">
					Showing emotional distribution for {studentName}
				</div>
			</CardFooter>
		</Card>
	);
}
