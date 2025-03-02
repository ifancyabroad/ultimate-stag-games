import { useEffect, useState } from "react";
import { getPlayers } from "../utils/database";
import { IPlayer } from "../utils/types";
import { PlayerCard } from "../components/PlayerCard";
import { Layout } from "../components/Layout";
import { PageLoader } from "../components/PageLoader";

const Players: React.FC = () => {
	const [players, setPlayers] = useState<IPlayer[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPlayers = async () => {
			const data = await getPlayers();
			setPlayers(data);
			setIsLoading(false);
		};

		fetchPlayers();
	}, []);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<Layout>
			<div className="title__wrapper">
				<div className="title__content">
					<h1 className="text-2xl md:text-4xl text-center font-medium uppercase mb-2">PLAYERS</h1>
					<p className="text-center">Meet the players and see their key attributes.</p>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
						{players.map((player) => (
							<PlayerCard key={player.id} {...player} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Players;
