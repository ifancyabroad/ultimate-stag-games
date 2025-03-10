import { useContext } from "react";
import { PlayerCard } from "common/components/PlayerCard";
import { Layout } from "common/components/Layout";
import { DataContext } from "common/context/DataContext";

const Players: React.FC = () => {
	const players = useContext(DataContext);

	return (
		<Layout>
			<div className="title__wrapper">
				<div className="title__content">
					<h1 className="mb-2 text-center text-2xl font-medium uppercase md:text-4xl">PLAYERS</h1>
					<p className="text-center">Meet the players and see their key attributes.</p>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="mx-auto max-w-6xl">
					<div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5">
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
