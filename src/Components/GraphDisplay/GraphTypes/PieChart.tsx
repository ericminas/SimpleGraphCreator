import { useEffect, type JSX } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useRowsData, type GraphDataPoint } from "../../Context/DataProvider";
import type { AssertionNotification } from "./NotificationList";
import { useColumnsData, type ColumnDefinition } from "../../Context/ColumnProvider";
import { useGraphContext } from "../../Context/GraphContextProvider";
import { useColorContextData } from "../../Context/ColorContextProvider";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, ChartDataLabels, Tooltip, Legend);

function checkAssertions(
	rowData: GraphDataPoint[],
	columns: ColumnDefinition[]
): AssertionNotification[] {
	const values = rowData.map((r) => parseInt(r[columns[1].id]));
	const notifications: AssertionNotification[] = [];

	// ERR: the values must all be numbers
	if (!values.every((v) => typeof v === "number")) {
		notifications.push({
			type: "error",
			title: "Incorrect value type",
			content: "All values must be numbers, at least one was not detected as such",
		});
	}

	// ERR: the values must add up to 100
	const sum = values.reduce((acc, cur) => (acc += cur));
	if (100 - sum !== 0) {
		notifications.push({
			type: "error",
			title: "Incorrect Sum",
			content: `All values must add up to 100. The actual sum is ${sum}`,
		});
	}

	// WARN: at most 2 cols
	if (columns.length > 2) {
		notifications.push({
			type: "warn",
			title: "More columns than needed",
			content: `More than two columns are defined, the Chart will only use the first two columns.`,
		});
	}

	return notifications;
}

export default function DonutChart({
	setAssertionNotifications,
}: {
	setAssertionNotifications: (v: AssertionNotification[]) => void;
}): JSX.Element {
	const { data: rowData } = useRowsData();
	const { columns } = useColumnsData();
	const { getOptions } = useGraphContext();
	const { colors } = useColorContextData();

	// update the assertion notifications
	useEffect(() => {
		if (columns.length > 2) setAssertionNotifications(checkAssertions(rowData, columns));
	}, [rowData, columns]);

	const graphData = {
		labels: rowData.map((r) => r[columns[0].id]),
		datasets: [
			{
				label: columns[1].label,
				data: rowData.map((r) => r[columns[1].id]),
				backgroundColor: colors.map((c) => c.fill),
				borderColor: colors.map((c) => c.border),
				borderWidth: 1,
			},
		],
	};

	return (
		<Box
			sx={{
				width: "200px",
				height: "200px",
				// position: "relative",
				// display: "flex",
				// alignItems: "center",
				// justifyContent: "center",
			}}
		>
			<Pie
				data={graphData}
				options={getOptions() as ChartOptions<"pie">}
			/>
		</Box>
	);
}
