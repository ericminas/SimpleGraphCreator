import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import DataPanel from "./Components/DataInsertion/DataPanel";
import GraphPanel from "./Components/GraphDisplay/GraphPanel";

export default function App() {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				overflow: "hidden",
				position: "relative",
				boxSizing: "border-box",

				display: "flex",
				flexDirection: { md: "column", lg: "row" },

				"> *": {
					boxSizing: "border-box",
				},
			}}
		>
			<Box
				sx={{
					height: { md: "49%", lg: "100%" },
					width: { md: "100%", lg: "49%" },
					display: "flex",
					padding: "0.25rem",
				}}
			>
				<DataPanel />
			</Box>
			<Divider
				orientation={isLargeScreen ? "vertical" : "horizontal"}
				sx={{
					width: { md: "100%", lg: "2px" },
					height: { md: "2px", lg: "auto" },
					borderColor: "black",
				}}
			/>
			<Box
				sx={{
					height: { md: "49%", lg: "100%" },
					width: { md: "100%", lg: "49%" },
					display: "flex",
					padding: "0.25rem",
				}}
			>
				<GraphPanel />
			</Box>
		</Box>
	);
}
