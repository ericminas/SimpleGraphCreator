// Export the color palette
export const chartColors = [
	{ fill: "rgba(66, 133, 244, 0.2)", border: "rgb(66, 133, 244)" },
	{ fill: "rgba(234, 67, 53, 0.2)", border: "rgb(234, 67, 53)" },
	{ fill: "rgba(251, 188, 5, 0.2)", border: "rgb(251, 188, 5)" },
	{ fill: "rgba(52, 168, 83, 0.2)", border: "rgb(52, 168, 83)" },
	{ fill: "rgba(255, 109, 0, 0.2)", border: "rgb(255, 109, 0)" },
	{ fill: "rgba(154, 160, 166, 0.2)", border: "rgb(154, 160, 166)" },
	{ fill: "rgba(230, 124, 115, 0.2)", border: "rgb(230, 124, 115)" },
	{ fill: "rgba(246, 191, 38, 0.2)", border: "rgb(246, 191, 38)" },
	{ fill: "rgba(87, 187, 138, 0.2)", border: "rgb(87, 187, 138)" },
	{ fill: "rgba(255, 214, 102, 0.2)", border: "rgb(255, 214, 102)" },
	{ fill: "rgba(120, 144, 156, 0.2)", border: "rgb(120, 144, 156)" },
	{ fill: "rgba(162, 196, 201, 0.2)", border: "rgb(162, 196, 201)" },
	{ fill: "rgba(164, 194, 244, 0.2)", border: "rgb(164, 194, 244)" },
	{ fill: "rgba(147, 196, 125, 0.2)", border: "rgb(147, 196, 125)" },
	{ fill: "rgba(118, 165, 175, 0.2)", border: "rgb(118, 165, 175)" },
	{ fill: "rgba(255, 171, 145, 0.2)", border: "rgb(255, 171, 145)" },
	{ fill: "rgba(206, 147, 216, 0.2)", border: "rgb(206, 147, 216)" },
	{ fill: "rgba(244, 194, 194, 0.2)", border: "rgb(244, 194, 194)" },
	{ fill: "rgba(255, 229, 153, 0.2)", border: "rgb(255, 229, 153)" },
	{ fill: "rgba(182, 215, 168, 0.2)", border: "rgb(182, 215, 168)" },
];

/**
 * Gets multiple colors from the chart color palette.
 *
 * @param {number} count - The number of colors to retrieve
 * @returns {Array<{ fill: string, border: string }>} Array of color objects
 */
export function getChartColors(count: number) {
	return Array.from({ length: count }, (_, i) => chartColors[i % chartColors.length]);
}
