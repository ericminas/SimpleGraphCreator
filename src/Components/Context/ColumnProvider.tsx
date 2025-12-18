import { createContext, useContext, useState, type JSX, type ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ColumnDefinition {
	id: string;
	label: string;
}

export interface ColumnContextType {
	columns: ColumnDefinition[];
	addColumn: (entry: ColumnDefinition) => void;
	addEmptyColumn: () => void;
	editColumn: (entry: ColumnDefinition) => void;
	removeColumn: (id: string) => void;
	shiftColumn: (id: string, direction: "l" | "r") => void;
}

const ColumnContext = createContext<ColumnContextType | undefined>(undefined);
export { ColumnContext };

export default function ColumnProvider({ children }: { children: ReactNode }): JSX.Element {
	const [columns, setColumns] = useState<ColumnDefinition[]>([
		{ id: "label", label: "label" },
		{ id: "value", label: "value" },
	]);

	const addColumn = (entry: ColumnDefinition): void => {
		setColumns((prev) => [...prev, entry]);
	};

	const addEmptyColumn = (): void => {
		setColumns((prev) => [...prev, { id: uuidv4(), label: "new_label" }]);
	};

	const editColumn = (updatedEntry: ColumnDefinition): void => {
		setColumns((prev) => [...prev.filter((c) => c.id !== updatedEntry.id), updatedEntry]);
	};

	const removeColumn = (id: string): void => {
		setColumns((prev) => prev.filter((c) => c.id !== id));
	};

	const shiftColumn = (id: string, direction: "l" | "r"): void => {
		setColumns((prev) => {
			const result = Array.from(prev);
			const elementIdx = result.findIndex((c) => c.id === id);
			const [removed] = result.splice(elementIdx, 1);
			result.splice(elementIdx + (direction === "l" ? -1 : 1), 0, removed);
			return result;
		});
	};

	return (
		<ColumnContext.Provider
			value={{ columns, addColumn, addEmptyColumn, editColumn, removeColumn, shiftColumn }}
		>
			{children}
		</ColumnContext.Provider>
	);
}

export function useColumnsData(): ColumnContextType {
	const context = useContext(ColumnContext);
	if (!context) {
		throw new Error("useColumnsData must be used within a DataProvider");
	}
	return context;
}
