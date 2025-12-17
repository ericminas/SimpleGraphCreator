import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRef, useState } from "react";
import {
	Box,
	Button,
	ButtonGroup,
	ClickAwayListener,
	Grow,
	MenuItem,
	MenuList,
	Paper,
	Popper,
} from "@mui/material";
import { toJpeg, toPng } from "html-to-image";

export interface DownloadButtonProps {
	chartReference: React.RefObject<HTMLDivElement | null>;
}

const options = ["jpg", "png"/* , "html" */];

// const htmlContent = (title: string, html: string) => `
// <!DOCTYPE html>
// <html>
// <head>
// 	<meta charset="UTF-8">
// 	<title>${title}</title>
// 	<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
// 	<style>
// 		body { 
// 			margin: 20px; 
// 			font-family: Arial, sans-serif;
// 			display: flex;
// 			justify-content: center;
// 			align-items: center;
// 			min-height: 100vh;
// 		}
// 		#chartContainer {
// 			width: 80%;
// 			max-width: 800px;
// 		}
// 	</style>
// </head>
// <body>
// 	<div id="chartContainer">
// 		<canvas id="myChart"></canvas>
// 	</div>
// 	<script>
// 		// You need to pass your chart configuration here
// 		const ctx = document.getElementById('myChart');
// 		new Chart(ctx, {
// 			// Your chart config goes here
// 			type: 'line', // or 'bar', 'pie', etc.
// 			data: {
// 				// Your chart data
// 			},
// 			options: {
// 				// Your chart options
// 			}
// 		});
// 	</script>
// </body>
// </html>`;

export default function DownloadButton({ chartReference }: DownloadButtonProps) {
	const [open, setOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(1);
	const anchorRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		if (!chartReference.current) {
			console.error("Could not find chart reference!");
			return;
		}

		const extension = options[selectedIndex];
		let downloadPromise: Promise<string>;

		switch (extension) {
			// case "html":
			// 	downloadPromise = new Promise((resolve) => {
			// 		const blob = new Blob([htmlContent("a", chartReference.current?.outerHTML!)], {
			// 			type: "text/html;charset=utf-8",
			// 		});
			// 		const dataUrl = URL.createObjectURL(blob);
			// 		resolve(dataUrl);
			// 	});
			// 	break;
			case "jpg":
				downloadPromise = toJpeg(chartReference.current, {
					quality: 0.95,
					pixelRatio: 2,
					cacheBust: true,
					backgroundColor: "#ffffff", // JPG needs background color
				}).then((dataUrl) => {
					// Convert to blob for more reliable download
					return fetch(dataUrl)
						.then((res) => res.blob())
						.then((blob) => URL.createObjectURL(blob));
				});
				break;
			case "png":
				downloadPromise = toPng(chartReference.current, {
					pixelRatio: 2, // Higher quality
					cacheBust: true, // Prevent caching issues
				});
				break;
			default:
				console.error("Tried to access an extension that is not defined");
				return;
		}

		downloadPromise
			.then((dataUrl) => {
				// Verify the data URL is valid
				if (!dataUrl || (!dataUrl.startsWith("data:") && !dataUrl.startsWith("blob:"))) {
					throw new Error("Invalid data URL generated");
				}

				const link = document.createElement("a");
				link.download = `chart.${extension}`;
				link.href = dataUrl;
				document.body.appendChild(link); // Add to DOM
				link.click();
				document.body.removeChild(link); // Remove from DOM

				// Cleanup object URLs
				// if (extension === "html") {
				// 	setTimeout(() => URL.revokeObjectURL(dataUrl), 100);
				// }
			})
			.catch((error) => {
				console.error("Error generating download:", error);
			});
	};

	const handleMenuItemClick = (
		_event: React.MouseEvent<HTMLLIElement, MouseEvent>,
		index: number
	) => {
		setSelectedIndex(index);
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: Event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	return (
		<Box sx={{ width: "10rem" }}>
			<ButtonGroup
				sx={{ width: "100%" }}
				variant="contained"
				ref={anchorRef}
				aria-label="Button group with a nested menu"
			>
				<Button
					sx={{ width: "80%", padding: "2px" }}
					onClick={handleClick}
				>
					{options[selectedIndex]}
				</Button>
				<Button
					sx={{ width: "20%", borderLeft: "1px solid white", padding: "2px" }}
					size="small"
					aria-controls={open ? "split-button-menu" : undefined}
					aria-expanded={open ? "true" : undefined}
					aria-label="select merge strategy"
					aria-haspopup="menu"
					onClick={handleToggle}
				>
					<ArrowDropDownIcon />
				</Button>
			</ButtonGroup>
			<Popper
				sx={{ width: "10rem", zIndex: 1 }}
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === "bottom" ? "center top" : "center bottom",
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									id="split-button-menu"
									autoFocusItem
								>
									{options.map((option, index) => (
										<MenuItem
											key={option}
											selected={index === selectedIndex}
											onClick={(event) => handleMenuItemClick(event, index)}
										>
											{option.toUpperCase()}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Box>
	);
}
