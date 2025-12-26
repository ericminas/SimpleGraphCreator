import { createContext, useContext, useState, type JSX, type ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export interface GraphData {
	data: GraphDataPoint[];
}

export interface GraphDataPoint {
	id: string;
	[colId: string]: string;
}

export interface DataContextType {
	data: GraphDataPoint[];
	addData: (value: Omit<GraphDataPoint, "id">) => void;
	addEmptyRow: () => void;
	editData: (value: GraphDataPoint) => void;
	removeData: (id: string) => void;
	reorderData: (startIndex: number, endIndex: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);
export { DataContext };

export default function DataProvider({ children }: { children: ReactNode }): JSX.Element {
	const [data, setData] = useState<GraphDataPoint[]>([
		{
			label: "Entry",
			value: "1",
			id: uuidv4(),
		},
	]);

	const addData = (newEntry: Omit<GraphDataPoint, "id">): void => {
		setData((prev) => [...prev, { ...newEntry, id: uuidv4() }]);
	};

	const addEmptyRow = (): void => {
		const newEntry: GraphDataPoint = { label: "", value: "", id: uuidv4() };
		setData((prev) => [...prev, newEntry]);
	};

	const editData = (updatedEntry: GraphDataPoint): void => {
		// accept "." and ","
		for (let key of Object.keys(updatedEntry)) {
			updatedEntry[key] = updatedEntry[key].replaceAll(",", ".");
		}

		setData((prev) => prev.map((d) => (d.id === updatedEntry.id ? updatedEntry : d)));
	};

	const removeData = (dataId: string): void => {
		setData((prev) => prev.filter((d) => d.id !== dataId));
	};

	const reorderData = (startIndex: number, endIndex: number): void => {
		setData((prev) => {
			const result = Array.from(prev);
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);
			return result;
		});
	};

	return (
		<DataContext.Provider value={{ data, addData, addEmptyRow, editData, removeData, reorderData }}>
			{children}
		</DataContext.Provider>
	);
}

export function useRowsData(): DataContextType {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useRowsData must be used within a DataProvider");
	}
	return context;
}
