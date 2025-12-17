import { createContext, useContext, useState, type JSX, type ReactNode } from "react";

export const GRAPH_STYLES = ["line", "pie", "bar"] as const;
export type GraphStyle = (typeof GRAPH_STYLES)[number];

export interface GraphContextDataType {
	style: GraphStyle;
	title: string;
	xAxisTitle: string;
	yAxisTitle: string;
}

export interface GraphContextType {
	settings: GraphContextDataType;
	setStyle: (v: GraphStyle) => void;
	setTitle: (v: string) => void;
	setAxisTitle: (axis: "x" | "y", v: string) => void;
	getOptions: () => unknown; // TODO this should have the type of the option object for the chart package
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);
export { GraphContext };

export default function GraphContextProvider({ children }: { children: ReactNode }): JSX.Element {
	const [settings, setSettings] = useState<GraphContextDataType>({
		style: "line",
		title: "",
		xAxisTitle: "",
		yAxisTitle: "",
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

	const getOptions = () => {
		return {
			responsive: true,

			plugins: {
				title: { text: settings.title, display: settings.title.length > 0 },
				legend: { display: settings.style === "pie" },
			},
			scales: {
				y: { title: { text: settings.xAxisTitle, display: settings.xAxisTitle.length > 0 } },
				x: {
					title: {
						test: settings.xAxisTitle,
						display: settings.yAxisTitle.length > 0,
						align: "center",
					},
				},
			},
		};
	};

	return (
		<GraphContext.Provider value={{ settings, setStyle, setTitle, setAxisTitle, getOptions }}>
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
