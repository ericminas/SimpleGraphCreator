import { Box, Typography } from "@mui/material";
import type { JSX } from "react";
import GraphArea from "./GraphArea";
import GraphSettings from "./GraphSettings";

export default function GraphPanel(): JSX.Element {
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
				Graph visualization
			</Typography>
			<Box >
				<GraphSettings />
			</Box>
			<Box sx={{  display: "flex", flex: 1 }}>
				<GraphArea />
			</Box>
			<Box sx={{ height: "10%" }}>Button row</Box>
		</Box>
	);
}
