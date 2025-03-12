import { useContext, useState } from "react";
import { Layout } from "common/components/Layout";
import { Link } from "react-router";
import { EVENT_LABEL_MAP, EVENTS } from "common/utils/constants";
import { Event } from "common/utils/enums";
import { ModalSubmit } from "common/components/ModalSubmit";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import { DataContext } from "common/context/DataContext";
import { AuthContext } from "common/context/AuthContext";

const Standings: React.FC = () => {
	const user = useContext(AuthContext);
	const players = useContext(DataContext);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<"overall" | Event>("overall");
	const canSubmit = user && selectedEvent !== "overall";

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedEvent(event.target.value as "overall" | Event);
	};

	const getSortedPlayers = () => {
		const playersCopy = players.map(({ shortName, events, id }) => {
			let points: number;
			let bonus: number;
			let total: number;
			if (selectedEvent === "overall") {
				points = Object.values(events).reduce((acc, curr) => acc + curr.points, 0);
				bonus = Object.values(events).reduce((acc, curr) => acc + curr.bonusPoints, 0);
				total = points + bonus;
			} else {
				points = events[selectedEvent].points;
				bonus = events[selectedEvent].bonusPoints;
				total = points + bonus;
			}
			return { shortName, id, points, bonus, total };
		});
		playersCopy.sort((a, b) => b.total - a.total);
		return playersCopy;
	};

	const sortedPlayers = getSortedPlayers();

	return (
		<Layout>
			<div className="title__wrapper">
				<div className="title__content">
					<h1 className="mb-2 text-center text-2xl font-medium uppercase md:text-4xl">STANDINGS</h1>
					<p className="text-center">See how the players are performing and who is leading the pack.</p>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="mx-auto max-w-lg">
					<div className="mb-4 flex items-stretch">
						<div className="relative flex-1">
							<select
								className={clsx(
									"block",
									"w-full",
									"appearance-none",
									"rounded-md",
									canSubmit && "rounded-r-none",
									"border",
									"border-neutral-800",
									"bg-white",
									"px-4",
									"py-3",
									"pr-8",
									"leading-tight",
									"focus:ring",
									"focus:outline-none",
								)}
								value={selectedEvent}
								onChange={handleEventChange}
							>
								<option value="overall">Overall</option>
								{EVENTS.map((event) => (
									<option key={event} value={event}>
										{EVENT_LABEL_MAP.get(event)}
									</option>
								))}
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
								<svg
									className="h-4 w-4 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>

						{canSubmit && (
							<div className="flex justify-center">
								<Button
									onClick={handleOpen}
									className="cursor-pointer rounded-r-md bg-blue-600 px-4 py-2 text-sm font-medium text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-blue-700 data-[open]:bg-blue-600"
								>
									Submit Results
								</Button>
							</div>
						)}
					</div>
					<table className="min-w-full bg-white">
						<colgroup>
							<col style={{ width: "5%" }} />
							<col style={{ width: "50%" }} />
							<col style={{ width: "15%" }} />
							<col style={{ width: "15%" }} />
							<col style={{ width: "15%" }} />
						</colgroup>
						<thead>
							<tr>
								<th className="border-b px-4 py-2"></th>
								<th className="border-b px-4 py-2 text-start">Name</th>
								<th className="border-b px-4 py-2 text-end">Points</th>
								<th className="border-b px-4 py-2 text-end">Bonus</th>
								<th className="border-b px-4 py-2 text-end">Total</th>
							</tr>
						</thead>
						<tbody>
							{sortedPlayers.map((player, index) => (
								<tr key={player.id}>
									<td className="border-b px-4 py-2">{index + 1}</td>
									<td className="border-b px-4 py-2">{player.shortName}</td>
									<td className="border-b px-4 py-2 text-end">{player.points}</td>
									<td className="border-b px-4 py-2 text-end">{player.bonus}</td>
									<td className="border-b px-4 py-2 text-end">{player.total}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="p-5 md:py-10">
				<div className="mx-auto max-w-lg">
					<h2 className="mb-4 text-xl font-bold">RULES</h2>
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
								Each player has a unique power and secret power that can be used to score additional
								points in each game. Check profiles{" "}
								<Link className="text-red-500 underline" to="/players">
									here
								</Link>{" "}
								for more information.
							</p>
						</div>
					</div>
				</div>
			</div>

			{canSubmit && (
				<ModalSubmit isOpen={isOpen} handleClose={handleClose} event={selectedEvent} players={players} />
			)}
		</Layout>
	);
};

export default Standings;
