import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { IPlayer } from "../utils/types";
import { getPlayers } from "../utils/database";
import { PageLoader } from "../components/PageLoader";

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
			<div className="p-5 md:py-10">
				<div className="max-w-lg mx-auto">
					<h1 className="text-2xl text-center font-bold mb-4">STANDINGS</h1>
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
		</Layout>
	);
};

export default Standings;
