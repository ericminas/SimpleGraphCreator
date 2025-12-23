import { createContext, useContext, useState, type JSX, type ReactNode } from "react";
import type { ChartOptions } from "chart.js";

export const GRAPH_STYLES = ["line", "area", "pie", "bar", "stacked bar"] as const;
export type GraphStyle = (typeof GRAPH_STYLES)[number];

export interface GraphContextDataType {
	style: GraphStyle;
	title: string;
	xAxisTitle: string;
	yAxisTitle: string;
	useMultipleColumns: boolean;
	showLegend: boolean;
}

export interface GraphContextType {
	settings: GraphContextDataType;
	setStyle: (v: GraphStyle) => void;
	setTitle: (v: string) => void;
	setAxisTitle: (axis: "x" | "y", v: string) => void;
	switchUseMultipleColumns: () => void;
	switchShowLegend: () => void;
	getOptions: () => ChartOptions;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);
export { GraphContext };

export default function GraphContextProvider({ children }: { children: ReactNode }): JSX.Element {
	const [settings, setSettings] = useState<GraphContextDataType>({
		style: "line",
		title: "",
		xAxisTitle: "",
		yAxisTitle: "",
		useMultipleColumns: true,
		showLegend: true,
	});

	const setStyle = (v: GraphStyle) => {
		setSettings((prev) => ({ ...prev, style: v }));
	};

	const setTitle = (v: string) => {
		setSettings((prev) => ({ ...prev, title: v }));
	};

	const setAxisTitle = (axis: string, v: string) => {
		setSettings((prev) => ({ ...prev, [axis === "x" ? "xAxisTitle" : "yAxisTitle"]: v }));
	};

	const switchUseMultipleColumns = () => {
		setSettings((prev) => ({ ...prev, useMultipleColumns: !prev.useMultipleColumns }));
	};

	const switchShowLegend = () => {
		setSettings((prev) => ({ ...prev, showLegend: !prev.showLegend }));
	};

	const getOptions = (): ChartOptions => {
		return {
			responsive: true,
			maintainAspectRatio: settings.style !== "pie",

			plugins: {
				title: { text: settings.title, display: settings.title.length > 0 },
				legend: {
					display: settings.showLegend,
				},
			},

			scales:
				settings.style !== "pie"
					? {
							y: {
								title: { text: settings.yAxisTitle, display: settings.yAxisTitle.length > 0 },
								stacked: settings.style === "stacked bar",
							},
							x: {
								title: {
									text: settings.xAxisTitle,
									display: settings.xAxisTitle.length > 0,
									align: "center",
								},
								stacked: settings.style === "stacked bar",
							},
					  }
					: {},
		};
	};

	return (
		<GraphContext.Provider
			value={{
				settings,
				setStyle,
				setTitle,
				setAxisTitle,
				switchUseMultipleColumns,
				switchShowLegend,
				getOptions,
			}}
		>
			{children}
		</GraphContext.Provider>
	);
}

export function useGraphContext(): GraphContextType {
	const context = useContext(GraphContext);
	if (!context) {
		throw new Error("useGraphContext must be used within a DataProvider");
	}
	return context;
}
