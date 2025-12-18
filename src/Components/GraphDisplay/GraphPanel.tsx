import { Box, Paper, Typography } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useEffect, useRef, useState, type JSX, type ReactNode } from "react";
import GraphSettings from "./GraphSettings";
import { useGraphContext } from "../Context/GraphContextProvider";
import DonutChart from "./GraphTypes/PieChart";
import BarChart from "./GraphTypes/BarChart";
import LineChart from "./GraphTypes/LineChart";
import DownloadButton from "./DownloadButton";
import NotificationList, { type AssertionNotification } from "./GraphTypes/NotificationList";
import { useColumnsData } from "../Context/ColumnProvider";

export default function GraphPanel(): JSX.Element {
	const { settings } = useGraphContext();
	const { columns } = useColumnsData();
	const [selectedGraphComponent, setSelectedGraphComponent] = useState<ReactNode>(null);
	const [assertionNotifications, setAssertionNotifications] = useState<AssertionNotification[]>([]);

	const chartContainerRef = useRef<HTMLDivElement>(null);

	// show an error if there are not enough columns
	useEffect(() => {
		if (columns.length < 2) {
			setAssertionNotifications((prev) => [
				{
					type: "error",
					title: "Not enough columns defined",
					content:
						"There must be at least two columns defined. The first one is used for the naming of the data and the second for the displayed data.",
				},
				...prev,
			]);
		}
	}, [columns]);

	// set the graph rendering element
	useEffect(() => {
		setAssertionNotifications([]);
		switch (settings.style) {
			case "pie":
				setSelectedGraphComponent(
					<DonutChart setAssertionNotifications={setAssertionNotifications} />
				);
				break;
			case "bar":
				setSelectedGraphComponent(
					<BarChart setAssertionNotifications={setAssertionNotifications} />
				);
				break;
			case "line":
			case "area":
				setSelectedGraphComponent(
					<LineChart setAssertionNotifications={setAssertionNotifications} />
				);
				break;
			default:
				setSelectedGraphComponent(<></>);
			// NOOP
		}
	}, [settings.style]);

	const hasErrorNotifications = assertionNotifications.filter((n) => n.type === "error").length > 0;

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

				<Box sx={{ padding: "0.5rem", marginY: "0.5rem" }}>
					<NotificationList notifications={assertionNotifications} />
				</Box>

				{!hasErrorNotifications && <div ref={chartContainerRef}>{selectedGraphComponent}</div>}
			</Paper>
			<Box>
				<DownloadButton chartReference={chartContainerRef} />
			</Box>
		</Box>
	);
}
