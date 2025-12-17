import {
	Box,
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

export default function GraphSettings(): JSX.Element {
	const { settings, setStyle, setTitle, setAxisTitle } = useGraphContext();
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
					<Box sx={{ display: "flex" }}>
						<SettingsIcon sx={{ color: "#003366" }} />
						<Typography
							component={"h6"}
							sx={{ fontWeight: "bold" }}
						>
							Graph Settings
						</Typography>
					</Box>
					<Box onClick={() => setCollapsed(!collapsed)}>
						{collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</Box>
				</Box>
				{/* {!collapsed && (
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",

							"> *": {
								marginX: "0.5rem",
							},
						}}
					>
						<Box>
							<InputLabel>Graph Style</InputLabel>
							<Select
								value={settings.style}
								onChange={(e) => setStyle(e.target.value)}
								sx={{ minWidth: "6.25rem" }}
							>
								{GRAPH_STYLES.map((style) => (
									<MenuItem value={style}>{style}</MenuItem>
								))}
							</Select>
						</Box>
						<Box>
							<InputLabel>Graph Title</InputLabel>
							<OutlinedInput
								value={settings.title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Box>
						<Box>
							<InputLabel>X-Axis Title</InputLabel>
							<OutlinedInput
								value={settings.xAxisTitle}
								onChange={(e) => setAxisTitle("x",e.target.value)}
							/>
						</Box>
						<Box>
							<InputLabel>Y-Axis Title</InputLabel>
							<OutlinedInput
								value={settings.yAxisTitle}
								onChange={(e) => setAxisTitle("y",e.target.value)}
							/>
						</Box>
					</Box>
				)} */}
				{!collapsed && (
					<Box sx={{ paddingX: "0.5rem" }}>
						<Grid
							container
							columns={4}
							rowSpacing={2}
							columnSpacing={2}
						>
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
							<Grid size={2}>
								<InputLabel>X-Axis Title</InputLabel>
								<OutlinedInput
									value={settings.xAxisTitle}
									onChange={(e) => setAxisTitle("x", e.target.value)}
									sx={{ width: "100%" }}
								/>
							</Grid>
							<Grid size={2}>
								<InputLabel>Y-Axis Title</InputLabel>
								<OutlinedInput
									value={settings.yAxisTitle}
									onChange={(e) => setAxisTitle("y", e.target.value)}
									sx={{ width: "100%" }}
								/>
							</Grid>
						</Grid>
					</Box>
				)}
			</Paper>
		</Box>
	);
}
