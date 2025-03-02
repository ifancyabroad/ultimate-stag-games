import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { IPlayer } from "../utils/types";
import { getPlayers } from "../utils/database";
import { PageLoader } from "../components/PageLoader";
import { Link } from "react-router";

const Standings: React.FC = () => {
	const [players, setPlayers] = useState<IPlayer[]>([]);
	const sortedPlayers = [...players];
	sortedPlayers.sort((a, b) => a.points - b.points);
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
					<h1 className="text-2xl md:text-4xl text-center font-medium uppercase mb-2">STANDINGS</h1>
					<p className="text-center">See how the players are performing and who is leading the pack.</p>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="max-w-lg mx-auto">
					<table className="min-w-full bg-white">
						<colgroup>
							<col style={{ width: "10%" }} />
							<col style={{ width: "70%" }} />
							<col style={{ width: "20%" }} />
						</colgroup>
						<thead>
							<tr>
								<th className="py-2 px-4 border-b"></th>
								<th className="py-2 px-4 border-b text-start">Name</th>
								<th className="py-2 px-4 border-b text-end">Points</th>
							</tr>
						</thead>
						<tbody>
							{sortedPlayers.map((player, index) => (
								<tr key={player.id}>
									<td className="py-2 px-4 border-b">{index + 1}</td>
									<td className="py-2 px-4 border-b">{player.shortName}</td>
									<td className="py-2 px-4 border-b text-end">{player.points}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="max-w-lg mx-auto">
					<h2 className="text-xl font-bold mb-4">RULES</h2>
					<div className="space-y-3 text-sm font-medium">
						<div className="flex gap-2">
							<p>1.</p>
							<p>
								Players earn points based on their rank in each activity as follows;{" "}
								<strong>
									1st place = 5 points, 2nd place = 3 points, 3rd place = 2 points, 4th place = 1
									point, 5th place = 0 points
								</strong>
							</p>
						</div>

						<div className="flex gap-2">
							<p>2.</p>
							<p>
								There will be a vote after each game to award one player with an "MVP" point based on
								the following criteria;{" "}
								<strong>Positive attitude, Good sportsmanship, Entertainment factor</strong>
							</p>
						</div>
						<div className="flex gap-2">
							<p>3.</p>
							<p>
								Each player has a unique power that can be used to score additional points in each game.
								Check profiles{" "}
								<Link className="underline text-red-500" to="/players">
									here
								</Link>{" "}
								for more information.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Standings;
