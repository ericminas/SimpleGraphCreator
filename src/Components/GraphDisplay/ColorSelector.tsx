import { Avatar, Box } from "@mui/material";
import { type JSX } from "react";
import { Add as AddIcon, Check as CheckIcon } from "@mui/icons-material";
import { getChartColors, useColorContextData } from "../Context/ColorContextProvider";

export default function ColorSelector(): JSX.Element {
	const { colors, updateColorIndex } = useColorContextData();
	const baseColors = getChartColors(10);

	// TODO allow multiple select, depending on the chat type (in V2)

	return (
		<Box
			sx={{ display: "flex", flexDirection: "row" }}
			gap={1}
		>
			{baseColors.map((color, idx) => (
				<Avatar
					sx={{ bgcolor: color.fill, border: `1px solid ${color.border}`, cursor: "pointer" }}
					key={idx}
				>
					<div onClick={() => updateColorIndex(idx)}>
						{colors.some((colorObj) => colorObj.id === idx) ? (
							<CheckIcon sx={{ color: "black" }} />
						) : (
							<AddIcon sx={{ color: "black" }} />
						)}
					</div>
				</Avatar>
			))}
		</Box>
	);
}
