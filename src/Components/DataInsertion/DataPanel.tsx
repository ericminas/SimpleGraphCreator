import { Box, Paper, Typography } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import type { JSX } from "react";
import DataTable from "./Datatable";

export default function DataPanel(): JSX.Element {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
				padding: "0.25rem",
			}}
		>
			<Paper
				sx={{
					padding: "0.25rem",
					display: "flex",
					flexDirection: "column",
					width: "100%",
				}}
			>
				<Box
					sx={{
						padding: "0.5rem",
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
					}}
					gap={2}
				>
					<TableChartIcon sx={{ color: "#003366" }} />
					<Typography
						component={"h6"}
						sx={{ fontWeight: "bold" }}
					>
						Data Entry
					</Typography>
				</Box>
				<Box sx={{ height: "80%", display: "flex", flex: 1 }}>
					<DataTable />
				</Box>
			</Paper>
			{/* <Box sx={{ height: "10%" }}>extra inputs (csv, textfield)</Box> */}
		</Box>
	);
}
