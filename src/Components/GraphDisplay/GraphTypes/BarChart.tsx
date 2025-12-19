import { useEffect, type JSX } from "react";
import {
	Chart as ChartJS,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useRowsData, type GraphDataPoint } from "../../Context/DataProvider";
import type { AssertionNotification } from "./NotificationList";
import { useColumnsData, type ColumnDefinition } from "../../Context/ColumnProvider";
import { useColorContextData } from "../../Context/ColorContextProvider";
import { useGraphContext, type GraphContextDataType } from "../../Context/GraphContextProvider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function checkAssertions(
	rowData: GraphDataPoint[],
	columns: ColumnDefinition[],
	settings: GraphContextDataType
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
	if (!settings.useMultipleColumns && columns.length > 2) {
		notifications.push({
			type: "warn",
			title: "More columns than needed",
			content: `More than two columns are defined, the Chart will only use the first two columns.`,
		});
	}

	return notifications;
}

export default function BarChart({
	setAssertionNotifications,
}: {
	setAssertionNotifications: (v: AssertionNotification[]) => void;
}): JSX.Element {
	const { data: rowData } = useRowsData();
	const { columns } = useColumnsData();
	const { colors } = useColorContextData();
	const { settings, getOptions } = useGraphContext();

	// update the assertion notifications
	useEffect(() => {
		if (columns.length > 2) setAssertionNotifications(checkAssertions(rowData, columns, settings));
	}, [rowData, columns, settings.useMultipleColumns]);

	// generate the data sets
	const datasets = [];
	if (settings.useMultipleColumns) {
		for (let colIdx = 1; colIdx < columns.length; colIdx++) {
			datasets.push({
				label: columns[colIdx].label,
				data: rowData.map((r) => r[columns[colIdx].id]),
				backgroundColor: colors.map((c) => c.fill)[colIdx - 1],
				borderColor: colors.map((c) => c.border)[colIdx - 1],
				borderWidth: 1,
			});
		}
	} else {
		datasets.push({
			label: columns[1].label,
			data: rowData.map((r) => r[columns[1].id]),
			backgroundColor: colors.map((c) => c.fill)[0],
			borderColor: colors.map((c) => c.border)[0],
			borderWidth: 1,
		});
	}

	const graphData = {
		labels: rowData.map((r) => r[columns[0].id]),
		datasets,
	};

	return (
		<Bar
			data={graphData}
			options={getOptions() as ChartOptions<"bar">}
		/>
	);
}
