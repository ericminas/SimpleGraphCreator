import { Box, Divider, Typography } from "@mui/material";
import DataPanel from "./Components/DataPane";

export default function App() {
	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				overflow: "hidden",
				position: "relative",
				boxSizing: "border-box",

				display: "flex",
				flexDirection: "row",

				"> *": {
					boxSizing: "border-box",
				},
			}}
		>
			<Box sx={{ height: "100%", width: "49%", display: "flex", padding: "0.25rem" }}>
				<DataPanel />
			</Box>
			<Divider
				orientation="vertical"
				sx={{ width: "2px", borderColor: "black" }}
			/>
			<Box sx={{ height: "100%", width: "49%", display: "flex", padding: "0.25rem" }}>
				<Typography component="h1">Graph visualization</Typography>
			</Box>
		</Box>
	);
}
