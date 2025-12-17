import { Box, Divider } from "@mui/material";
import DataPanel from "./Components/DataInsertion/DataPanel";
import GraphPanel from "./Components/GraphDisplay/GraphPanel";

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
				<GraphPanel />
			</Box>
		</Box>
	);
}
