import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import DataProvider from "./Components/Context/DataProvider.tsx";
import ColumnProvider from "./Components/Context/ColumnProvider.tsx";
import GraphContextProvider from "./Components/Context/GraphContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GraphContextProvider>
			<DataProvider>
				<ColumnProvider>
					<App />
				</ColumnProvider>
			</DataProvider>
		</GraphContextProvider>
	</StrictMode>
);
