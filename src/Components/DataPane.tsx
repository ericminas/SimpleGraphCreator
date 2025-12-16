import { Box, ButtonGroup, Typography } from "@mui/material";
import type { JSX } from "react";
import DataTable from "./DataInsertion/Datatable";

export default function DataPanel(): JSX.Element {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
				paddingLeft: "0.25rem",
			}}
		>
			<Typography
				component="h1"
				sx={{ marginBottom: "1rem", height: "10%" }}
			>
				Data Entry
			</Typography>
			<Box sx={{ height: "80%", display: "flex", flex: 1 }}>
				<DataTable />
			</Box>
			<Box sx={{ height: "10%" }}>buttons</Box>
		</Box>
	);
}
