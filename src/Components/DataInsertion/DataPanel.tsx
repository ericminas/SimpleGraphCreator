import { Box, Typography } from "@mui/material";
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
			}}
		>
			<Typography
				component="h1"
				sx={{
					marginBottom: "1rem",
					minHeight: "1rem",
					textAlign: "center",
					borderBottom: "1px solid grey",
					boxShadow: "0 3px 3px #003366",
				}}
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
