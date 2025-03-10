import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Standings from "./pages/Standings";
import Players from "./pages/Players";
import Player from "./pages/Player";
import { AuthProvider } from "common/providers/AuthProvider";
import { ModalProvider } from "common/providers/ModalProvider";
import { ModalLogin } from "common/components/ModalLogin";
import { DataProvider } from "common/providers/DataProvider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<DataProvider>
				<ModalProvider>
					<BrowserRouter>
						<Routes>
							<Route index element={<Standings />} />
							<Route path="players">
								<Route index element={<Players />} />
								<Route path=":id" element={<Player />} />
							</Route>
						</Routes>
					</BrowserRouter>

					<ModalLogin />
				</ModalProvider>
			</DataProvider>
		</AuthProvider>
	</StrictMode>,
);
