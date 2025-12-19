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
	ButtonGroup,
	Button,
} from "@mui/material";
import { useState, useRef, type JSX } from "react";
import { useRowsData } from "../Context/DataProvider";
import { useColumnsData } from "../Context/ColumnProvider";
import DataRow from "./DataRow";
import {
	Delete as DeleteIcon,
	AddCircle as AddCircleIcon,
	ContentCopy as ContentCopyIcon,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	Clear as ClearIcon,
} from "@mui/icons-material";

const additionalColumns = 3;

interface ExtendedHeaderProps {
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

function InteractionBar({ selected, setSelected }: ExtendedHeaderProps): JSX.Element {
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
	const { columns, addEmptyColumn, editColumn, removeColumn, shiftColumn } = useColumnsData();

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
		<Paper
			sx={{ width: "100%", overflow: "hidden", display: "flex", flexDirection: "column", flex: 1 }}
		>
			<TableContainer sx={{ height: "100%", width: "100%", minWidth: "40rem" }}>
				<Table
					stickyHeader
					aria-label="sticky table"
				>
					<TableHead>
						<TableRow>
							<TableCell padding="normal" />
							<TableCell padding="checkbox">
								<Tooltip title="Select all rows">
									<Checkbox
										color="primary"
										indeterminate={numSelected > 0 && numSelected < rowCount}
										checked={rowCount > 0 && numSelected === rowCount}
										onChange={handleSelectAll}
										inputProps={{
											"aria-label": "select all rows",
										}}
									/>
								</Tooltip>
							</TableCell>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									sx={{ width: `${(1 / columns.length) * 100}%` }}
								>
									<OutlinedInput
										fullWidth
										value={column.label}
										onChange={(e) => editColumn({ id: column.id, label: e.target.value })}
									/>
									<ButtonGroup
										fullWidth
										variant="outlined"
										sx={{ width: "100%", marginTop: "0.25rem" }}
									>
										<Button onClick={() => shiftColumn(column.id, "l")}>
											<Tooltip title="Move column to the left">
												<ChevronLeftIcon />
											</Tooltip>
										</Button>
										<Button onClick={() => removeColumn(column.id)}>
											<Tooltip title="Delete column">
												<ClearIcon />
											</Tooltip>
										</Button>
										<Button onClick={() => shiftColumn(column.id, "r")}>
											<Tooltip title="Move column to the right">
												<ChevronRightIcon />
											</Tooltip>
										</Button>
									</ButtonGroup>
								</TableCell>
							))}
							<TableCell sx={{ cursor: "pointer" }}>
								<Tooltip title="Add new column">
									<AddCircleIcon onClick={() => addEmptyColumn()} />
								</Tooltip>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => (
							<DataRow
								key={`${row.id}-${index}`}
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
								<Tooltip title="Add new row">
									<AddCircleIcon />
								</Tooltip>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<InteractionBar
				selected={selected}
				setSelected={setSelected}
			/>
		</Paper>
	);
}
