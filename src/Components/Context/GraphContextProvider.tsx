import { createContext, useContext, useState, type JSX, type ReactNode } from "react";

export const GRAPH_STYLES = ["pie", "line", "bar"] as const;
export type GraphStyle = (typeof GRAPH_STYLES)[number];

export interface GraphContextDataType {
	style: GraphStyle;
	title: string;
}

export interface GraphContextType {
	settings: GraphContextDataType;
	setStyle: (v: GraphStyle) => void;
	setTitle: (v: string) => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);
export { GraphContext };

export default function GraphContextProvider({ children }: { children: ReactNode }): JSX.Element {
	const [settings, setSettings] = useState<GraphContextDataType>({
		style: "pie",
		title: "add title",
	});

	const setStyle = (v: GraphStyle) => {
		setSettings((prev) => ({ ...prev, style: v }));
	};

	const setTitle = (v: string) => {
		setSettings((prev) => ({ ...prev, title: v }));
	};

	return (
		<GraphContext.Provider value={{ settings, setStyle, setTitle }}>
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
