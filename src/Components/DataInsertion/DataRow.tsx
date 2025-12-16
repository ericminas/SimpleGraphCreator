import { Checkbox, TableCell, TableRow } from "@mui/material";
import { useState, type JSX } from "react";
import TableInput from "./TableInput";
import type { GraphDataPoint } from "../Context/DataProvider";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import type { ColumnDefinition } from "../Context/ColumnProvider";

interface DataRowProps {
	row: GraphDataPoint;
	columns: ColumnDefinition[];
	isSelected: boolean;
	onSelect: (id: string) => void;
	onEdit: (row: GraphDataPoint) => void;
	index: number;
	onDragStart: (index: number) => void;
	onDragEnter: (index: number) => void;
	onDragEnd: () => void;
}

export default function DataRow({
	row,
	columns,
	isSelected,
	onSelect,
	onEdit,
	index,
	onDragStart,
	onDragEnter,
	onDragEnd,
}: DataRowProps): JSX.Element {
	const [isDragging, setIsDragging] = useState(false);

	return (
		<TableRow
			hover
			role="checkbox"
			tabIndex={-1}
			key={row.id}
			selected={isSelected}
			draggable
			onDragStart={(e) => {
				setIsDragging(true);
				onDragStart(index);
				e.dataTransfer.effectAllowed = "move";
			}}
			onDragEnter={() => {
				onDragEnter(index);
			}}
			onDragEnd={() => {
				setIsDragging(false);
				onDragEnd();
			}}
			onDragOver={(e) => e.preventDefault()}
			sx={{
				opacity: isDragging ? 0.5 : 1,
				cursor: "move",
			}}
		>
			<TableCell
				padding="checkbox"
				sx={{ cursor: "grab" }}
			>
				<DragIndicatorIcon sx={{ color: "action.active", verticalAlign: "middle", mr: 1 }} />
				<Checkbox
					color="primary"
					checked={isSelected}
					onChange={() => onSelect(row.id)}
					onClick={(e) => e.stopPropagation()}
					inputProps={{
						"aria-labelledby": row.id,
					}}
				/>
			</TableCell>
			{columns.map((column) => {
				const value = row[column.id];
				return (
					<TableCell key={column.id}>
						<TableInput
							id={`${column.id}_value}`}
							initalValue={value}
							onChange={(v) => {
								onEdit({ ...row, [column.id]: v });
							}}
						/>
					</TableCell>
				);
			})}
		</TableRow>
	);
}
