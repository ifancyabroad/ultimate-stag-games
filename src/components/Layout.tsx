import { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => (
	<main className="flex flex-col min-h-screen">
		<Header />
		<div className="flex-1">{children}</div>
		<Footer />
	</main>
);
