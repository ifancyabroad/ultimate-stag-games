import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Standings from "./pages/Standings";
import Players from "./pages/Players";
import Player from "./pages/Player";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<Standings />} />
				<Route path="players">
					<Route index element={<Players />} />
					<Route path=":id" element={<Player />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
