import { InputAdornment, TextField, Tooltip } from "@mui/material";
import type { JSX } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export interface TableInputProps {
	id: string;
	initalValue: string;
	onChange: (val: string) => void;
	variant?: "standard" | "outlined";
}

export default function TableInput({
	id,
	initalValue,
	onChange,
	variant = "standard",
}: TableInputProps): JSX.Element {
	return (
		<TextField
			fullWidth
			key={id}
			id={id}
			variant={variant}
			value={initalValue}
			onChange={(e) => onChange(e.target.value ?? "")}
			slotProps={{
				input: {
					endAdornment: (
						<InputAdornment
							position="start"
							sx={{ cursor: "pointer" }}
						>
							<Tooltip title="Delete value">
								<RemoveCircleOutlineIcon
									onClick={() => {
										onChange("");
									}}
								/>
							</Tooltip>
						</InputAdornment>
					),
				},
			}}
		/>
	);
}
