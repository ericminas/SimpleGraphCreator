import {
	Checkbox,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	Toolbar,
	Typography,
	Tooltip,
	OutlinedInput,
} from "@mui/material";
import { useState, useRef, type JSX } from "react";
import { useRowsData } from "../Context/DataProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useColumnsData } from "../Context/ColumnProvider";
import DataRow from "./DataRow";

const additionalColumns = 3;

interface ExtendedHeaderProps {
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

function ExtendedHeader({ selected, setSelected }: ExtendedHeaderProps): JSX.Element {
	const { data, addData, removeData } = useRowsData();
	const handleDeleteSelected = () => {
		selected.forEach((id) => removeData(id));
		setSelected([]);
	};

	const handleCopySelected = () => {
		const selectedRows = data.filter((row) => selected.includes(row.id));
		selectedRows.forEach((row) => {
			const { id, ...rowWithoutId } = row;
			addData(rowWithoutId);
		});
		setSelected([]);
	};

	if (selected.length < 1) return <></>;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				bgcolor: (theme) =>
					theme.palette.mode === "light" ? "rgba(25, 118, 210, 0.08)" : "rgba(144, 202, 249, 0.16)",
			}}
		>
			<Typography
				sx={{ flex: "1 1 100%" }}
				color="inherit"
				variant="subtitle1"
				component="div"
			>
				{selected.length} selected
			</Typography>
			<Tooltip title="Copy">
				<IconButton onClick={handleCopySelected}>
					<ContentCopyIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Delete">
				<IconButton onClick={handleDeleteSelected}>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
}

export default function DataTable(): JSX.Element {
	const { data, addEmptyRow, editData, reorderData } = useRowsData();
	const { columns, addEmptyColumn, editColumn } = useColumnsData();

	const [selected, setSelected] = useState<string[]>([]);
	const dragItem = useRef<number | null>(null);
	const dragOverItem = useRef<number | null>(null);

	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const allIds = data.map((row) => row.id);
			setSelected(allIds);
		} else {
			setSelected([]);
		}
	};

	const handleSelectOne = (id: string) => {
		setSelected((prev) => {
			if (prev.includes(id)) {
				return prev.filter((selectedId) => selectedId !== id);
			} else {
				return [...prev, id];
			}
		});
	};

	const handleDragStart = (index: number) => {
		dragItem.current = index;
	};

	const handleDragEnter = (index: number) => {
		dragOverItem.current = index;
	};

	const handleDragEnd = () => {
		if (dragItem.current !== null && dragOverItem.current !== null) {
			reorderData(dragItem.current, dragOverItem.current);
		}
		dragItem.current = null;
		dragOverItem.current = null;
	};

	const isSelected = (id: string) => selected.includes(id);
	const numSelected = selected.length;
	const rowCount = data.length;

	return (
		<Paper sx={{ width: "100%", overflow: "hidden", display: "flex", flex: 1 }}>
			<ExtendedHeader
				selected={selected}
				setSelected={setSelected}
			/>
			<TableContainer sx={{ height: "100%", width: "100%", minWidth: "40rem" }}>
				<Table
					stickyHeader
					aria-label="sticky table"
				>
					<TableHead>
						<TableRow>
							<TableCell padding="normal" />
							<TableCell padding="checkbox">
								<Checkbox
									color="primary"
									indeterminate={numSelected > 0 && numSelected < rowCount}
									checked={rowCount > 0 && numSelected === rowCount}
									onChange={handleSelectAll}
									inputProps={{
										"aria-label": "select all rows",
									}}
								/>
							</TableCell>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									sx={{ width: `${(1 / columns.length) * 100}%` }}
								>
									<OutlinedInput
										value={column.label}
										onChange={(e) => editColumn({ id: column.id, label: e.target.value })}
									></OutlinedInput>
								</TableCell>
							))}
							<TableCell>
								<AddCircleIcon onClick={() => addEmptyColumn()} />
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => (
							<DataRow
								key={row.id}
								row={row}
								columns={columns}
								isSelected={isSelected(row.id)}
								onSelect={handleSelectOne}
								onEdit={editData}
								index={index}
								onDragStart={handleDragStart}
								onDragEnter={handleDragEnter}
								onDragEnd={handleDragEnd}
							/>
						))}
						<TableRow sx={{ cursor: "pointer" }}>
							<TableCell
								align="center"
								colSpan={columns.length + additionalColumns}
								sx={{ padding: "0.5rem" }}
								onClick={() => {
									addEmptyRow();
								}}
							>
								<AddCircleIcon />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
