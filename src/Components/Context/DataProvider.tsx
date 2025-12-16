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
			label: "row 1",
			value: "row 1",
			id: uuidv4(),
		},
		{
			label: "row 2",
			value: "row 2",
			id: uuidv4(),
		},
		{
			label: "row 3",
			value: "row 3",
			id: uuidv4(),
		},
		{
			label: "row 4",
			value: "row 4",
			id: uuidv4(),
		},
		{
			label: "row 5",
			value: "row 5",
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
		setData((prev) => [...prev.filter((d) => d.id !== updatedEntry.id), updatedEntry]);
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

export function useData(): DataContextType {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}
