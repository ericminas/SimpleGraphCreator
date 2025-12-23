import {
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Paper,
	Select,
	Typography,
} from "@mui/material";
import { useState, type JSX } from "react";
import { GRAPH_STYLES, useGraphContext } from "../Context/GraphContextProvider";
import {
	Settings as SettingsIcon,
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import ColorSelector from "./ColorSelector";
import { useColumnsData } from "../Context/ColumnProvider";

export default function GraphSettings(): JSX.Element {
	const { settings, setStyle, setTitle, setAxisTitle, switchUseMultipleColumns, switchShowLegend } =
		useGraphContext();
	const { columns } = useColumnsData();
	const [collapsed, setCollapsed] = useState<boolean>(false);

	return (
		<Box sx={{ width: "100%" }}>
			<Paper
				variant="outlined"
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					flexDirection: "column",
					width: "100%",
					paddingY: "0.5rem",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						padding: "0.25rem",
					}}
				>
					<Box
						sx={{ display: "flex" }}
						gap={2}
					>
						<SettingsIcon sx={{ color: "#003366" }} />
						<Typography
							component={"h6"}
							sx={{ fontWeight: "bold" }}
						>
							Graph Settings
						</Typography>
					</Box>
					<Box
						onClick={() => setCollapsed(!collapsed)}
						sx={{ cursor: "pointer" }}
					>
						{collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</Box>
				</Box>
				{!collapsed && (
					<Box sx={{ paddingX: "0.5rem" }}>
						<Grid
							container
							columns={4}
							rowSpacing={2}
							columnSpacing={2}
						>
							{/* Line 1 */}
							<Grid size={1}>
								<InputLabel>Graph Style</InputLabel>
								<Select
									value={settings.style}
									onChange={(e) => setStyle(e.target.value)}
									sx={{ width: "100%" }}
								>
									{GRAPH_STYLES.map((style) => (
										<MenuItem value={style}>{style}</MenuItem>
									))}
								</Select>
							</Grid>
							<Grid size={3}>
								<InputLabel>Graph Title</InputLabel>
								<OutlinedInput
									value={settings.title}
									onChange={(e) => setTitle(e.target.value)}
									sx={{ width: "100%" }}
								/>
							</Grid>
							{/* Line 2 */}
							{settings.style !== "pie" && (
								<Grid size={2}>
									<InputLabel>X-Axis Title</InputLabel>
									<OutlinedInput
										value={settings.xAxisTitle}
										onChange={(e) => setAxisTitle("x", e.target.value)}
										sx={{ width: "100%" }}
									/>
								</Grid>
							)}
							{settings.style !== "pie" && (
								<Grid size={2}>
									<InputLabel>Y-Axis Title</InputLabel>
									<OutlinedInput
										value={settings.yAxisTitle}
										onChange={(e) => setAxisTitle("y", e.target.value)}
										sx={{ width: "100%" }}
									/>
								</Grid>
							)}
							{/* Line 3 */}
							<Grid size={2}>
								<FormControlLabel
									control={<Checkbox checked={settings.showLegend} />}
									label="Show data legend"
									onChange={() => switchShowLegend()}
								/>
							</Grid>
							{settings.style !== "pie" && columns.length > 2 && (
								<Grid size={2}>
									<FormControlLabel
										control={<Checkbox checked={settings.useMultipleColumns} />}
										label="Use multiple value columns"
										onChange={() => switchUseMultipleColumns()}
									/>
								</Grid>
							)}

							{/* Line 4 */}
							<Grid size={4}>
								<ColorSelector />
							</Grid>
						</Grid>
					</Box>
				)}
			</Paper>
		</Box>
	);
}
