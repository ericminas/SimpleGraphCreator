import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import DataProvider from "./Components/Context/DataProvider.tsx";
import ColumnProvider from "./Components/Context/ColumnProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<DataProvider>
			<ColumnProvider>
				<App />
			</ColumnProvider>
		</DataProvider>
	</StrictMode>
);
