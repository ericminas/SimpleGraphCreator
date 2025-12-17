import { Box, Paper, Typography } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useEffect, useRef, useState, type JSX, type ReactNode } from "react";
import GraphSettings from "./GraphSettings";
import { useGraphContext } from "../Context/GraphContextProvider";
import DonutChart from "./GraphTypes/PieChart";
import BarChart from "./GraphTypes/BarChart";
import LineChart from "./GraphTypes/LineChart";
import DownloadButton from "./DownloadButton";

export default function GraphPanel(): JSX.Element {
	const { settings } = useGraphContext();
	const [selectedGraphComponent, setSelectedGraphComponent] = useState<ReactNode>(null);

	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		switch (settings.style) {
			case "pie":
				setSelectedGraphComponent(<DonutChart />);
				break;
			case "bar":
				setSelectedGraphComponent(<BarChart />);
				break;
			case "line":
				setSelectedGraphComponent(<LineChart />);
				break;
			default:
				setSelectedGraphComponent(<></>);
			// NOOP
		}
	}, [settings.style]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
			}}
		>
			<GraphSettings />
			<Paper
				variant="outlined"
				sx={{
					width: "100%",
					marginY: "0.5rem",
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
					<AutoGraphIcon sx={{ color: "#003366" }} />
					<Typography
						component={"h6"}
						sx={{ fontWeight: "bold" }}
					>
						Generated Graph
					</Typography>
				</Box>

				<div ref={chartContainerRef}>{selectedGraphComponent}</div>
			</Paper>
			<Box>
				<DownloadButton chartReference={chartContainerRef} />
			</Box>
		</Box>
	);
}
