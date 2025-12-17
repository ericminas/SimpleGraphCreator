import { Box, Paper, Typography } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useEffect, useState, type JSX, type ReactNode } from "react";
import { useGraphContext } from "../Context/GraphContextProvider";
import DonutChart from "./GraphTypes/PieChart";
import BarChart from "./GraphTypes/BarChart";
import LineChart from "./GraphTypes/LineChart";

export default function GraphArea(): JSX.Element {
	const { settings } = useGraphContext();
	const [selectedGraphComponent, setSelectedGraphComponent] = useState<ReactNode>(null);

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

			{selectedGraphComponent}
		</Paper>
	);
}
