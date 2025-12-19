import { Box, Paper, Stack, Typography } from "@mui/material";
import type { JSX } from "react";
import { Error as ErrorIcon, WarningAmber as WarningAmberIcon } from "@mui/icons-material";

export interface AssertionNotification {
	type: "error" | "warn";
	title: string;
	content: string;
}

interface NotificationListProps {
	notifications: AssertionNotification[];
}

export default function NotificationList({ notifications }: NotificationListProps): JSX.Element {
	return (
		<Stack>
			{notifications.map((notification) => (
				<Paper
					key={notification.title}
					elevation={2}
					sx={{ paddingX: "0.75rem", paddingY: "0.25rem", marginY:"0.5rem" }}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-start",
						}}
					>
						{notification.type === "error" ? (
							<ErrorIcon color="error" />
						) : (
							<WarningAmberIcon color="warning" />
						)}
						<Typography
							component={"h4"}
							sx={{ marginLeft: "1rem", fontWeight: "bolder" }}
						>
							{notification.title}
						</Typography>
					</Box>
					<Typography>{notification.content}</Typography>
				</Paper>
			))}
		</Stack>
	);
}
