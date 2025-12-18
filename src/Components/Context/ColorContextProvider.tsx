import { createContext, useContext, useEffect, useState, type JSX, type ReactNode } from "react";
import { useGraphContext } from "./GraphContextProvider";
import { useColumnsData } from "./ColumnProvider";

interface ColorDefinition {
	fill: string;
	border: string;
	id: number;
}

const chartColors: ColorDefinition[] = [
	{ fill: "#4285f4", border: "rgb(66, 133, 244)", id: 0 },
	{ fill: "#ea4335", border: "rgb(234, 67, 53)", id: 1 },
	{ fill: "#fbbc04", border: "rgb(251, 188, 5)", id: 2 },
	{ fill: "#34a853", border: "rgb(52, 168, 83)", id: 3 },
	{ fill: "#ff6d01", border: "rgb(255, 109, 0)", id: 4 },
	{ fill: "#46bdc6", border: "rgb(164, 194, 244)", id: 5 },
	{ fill: "rgba(66, 133, 244, 0.2)", border: "rgb(66, 133, 244)", id: 6 },
	{ fill: "rgba(234, 67, 53, 0.2)", border: "rgb(234, 67, 53)", id: 7 },
	{ fill: "rgba(251, 188, 5, 0.2)", border: "rgb(251, 188, 5)", id: 8 },
	{ fill: "rgba(52, 168, 83, 0.2)", border: "rgb(52, 168, 83)", id: 9 },
	{ fill: "rgba(255, 109, 0, 0.2)", border: "rgb(255, 109, 0)", id: 10 },
	{ fill: "rgba(154, 160, 166, 0.2)", border: "rgb(154, 160, 166)", id: 11 },
	{ fill: "rgba(230, 124, 115, 0.2)", border: "rgb(230, 124, 115)", id: 12 },
	{ fill: "rgba(246, 191, 38, 0.2)", border: "rgb(246, 191, 38)", id: 13 },
	{ fill: "rgba(87, 187, 138, 0.2)", border: "rgb(87, 187, 138)", id: 14 },
	{ fill: "rgba(255, 214, 102, 0.2)", border: "rgb(255, 214, 102)", id: 15 },
	{ fill: "rgba(120, 144, 156, 0.2)", border: "rgb(120, 144, 156)", id: 16 },
	{ fill: "rgba(162, 196, 201, 0.2)", border: "rgb(162, 196, 201)", id: 17 },
	{ fill: "rgba(164, 194, 244, 0.2)", border: "rgb(164, 194, 244)", id: 18 },
	{ fill: "rgba(147, 196, 125, 0.2)", border: "rgb(147, 196, 125)", id: 19 },
	{ fill: "rgba(118, 165, 175, 0.2)", border: "rgb(118, 165, 175)", id: 20 },
	{ fill: "rgba(255, 171, 145, 0.2)", border: "rgb(255, 171, 145)", id: 21 },
	{ fill: "rgba(206, 147, 216, 0.2)", border: "rgb(206, 147, 216)", id: 22 },
	{ fill: "rgba(244, 194, 194, 0.2)", border: "rgb(244, 194, 194)", id: 23 },
	{ fill: "rgba(255, 229, 153, 0.2)", border: "rgb(255, 229, 153)", id: 24 },
	{ fill: "rgba(182, 215, 168, 0.2)", border: "rgb(182, 215, 168)", id: 25 },
];

export function getChartColors(amount: number): ColorDefinition[] {
	return chartColors.slice(0, amount);
}

export interface ColorContextType {
	colors: ColorDefinition[];
	updateColorIndex: (idx: number) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);
export { ColorContext };

export default function ColorContextProvider({ children }: { children: ReactNode }): JSX.Element {
	// other hooks
	const { columns } = useColumnsData();
	const { settings } = useGraphContext();

	const [colors, setColors] = useState<ColorDefinition[]>([]);
	const [userSelectedColors, setUserSelectedColors] = useState<number[] | null>(null);

	const maxSelectableColors =
		columns.length > 2 && settings.style !== "bar" ? columns.length - 1 : 1;

	// create the default selection of colors
	useEffect(() => {
		if (maxSelectableColors > 1) {
			// if the user defined enough colors, then there should be no update
			if (userSelectedColors && userSelectedColors.length === maxSelectableColors) {
				return;
			}

			// col.len -1 colors should be selected
			setColors(chartColors.slice(0, maxSelectableColors));
		} else {
			// if the user defined enough colors, then there should be no update
			if (userSelectedColors && userSelectedColors.length === 1) {
				return;
			}

			// one color should be selected
			setColors([chartColors[0]]);
		}
	}, [columns, settings.style, userSelectedColors]);

	// update the colors based on the user selected colors
	useEffect(() => {
		const selectedColors = userSelectedColors?.map((selectedIdx) => chartColors[selectedIdx]);

		if (selectedColors && selectedColors != colors) {
			const updated = [...colors];
			selectedColors.forEach((selected) => {
				updated.shift();
				updated.push(selected);
			});

			// Compare updated and colors arrays, only update if different
			const isDifferent = updated.some((color, idx) => color !== colors[idx]);
			if (isDifferent) {
				setColors(updated);
			}
		}
	}, [colors, userSelectedColors]);

	const updateColorIndex = (idx: number): void => {
		if (maxSelectableColors === 1) {
			setUserSelectedColors([idx]);
		} else if (userSelectedColors == null) {
			setUserSelectedColors([idx]);
		} else {
			setUserSelectedColors((prev) => {
				if (prev!?.length < maxSelectableColors) {
					return [...prev!, idx];
				} else {
					const update = [...prev!];
					update.shift();
					update.push(idx);
					return update;
				}
			});
		}
	};

	return (
		<ColorContext.Provider value={{ colors, updateColorIndex }}>{children}</ColorContext.Provider>
	);
}

export function useColorContextData(): ColorContextType {
	const context = useContext(ColorContext);
	if (!context) {
		throw new Error("useColumnsData must be used within a DataProvider");
	}
	return context;
}
