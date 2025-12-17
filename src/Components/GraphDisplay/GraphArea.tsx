import { Paper } from "@mui/material";
import { useEffect, useState, type JSX, type ReactNode } from "react";
import DonutChart from "./GraphTypes/PieChart";
import { useGraphContext } from "../Context/GraphContextProvider";
import BarChart from "./GraphTypes/BarChart";

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
			{selectedGraphComponent}
		</Paper>
	);
}
