import { useEffect, useState, type JSX } from "react";

import {
	Chart as ChartJS,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useRowsData, type GraphDataPoint } from "../../Context/DataProvider";
import { getChartColors } from "./DefaultColors";
import type { AssertionNotification } from "./NotificationList";
import { useColumnsData, type ColumnDefinition } from "../../Context/ColumnProvider";
import NotificationList from "./NotificationList";
import { useGraphContext } from "../../Context/GraphContextProvider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

export default function BarChart(): JSX.Element {
	const { data: rowData } = useRowsData();
	const { columns } = useColumnsData();
	const { getOptions } = useGraphContext();

	const [assertionNotifications, setAssertionNotifications] = useState<AssertionNotification[]>([]);

	useEffect(() => {
		setAssertionNotifications(checkAssertions(rowData, columns));
	}, [rowData, columns]);

	// check whether the graph can be rendered
	if (assertionNotifications.length > 0) {
		return <NotificationList notifications={assertionNotifications} />;
	}

	const colors = getChartColors(rowData.length);

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
		<Bar
			data={graphData}
			//@ts-ignore
			options={getOptions()}
		/>
	);
}
