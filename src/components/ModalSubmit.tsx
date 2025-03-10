import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Event } from "../utils/enums";
import { IPlayer } from "../utils/types";
import { EVENT_LABEL_MAP } from "../utils/constants";
import { useEffect, useState } from "react";
import { updatePlayer } from "../utils/database";

interface IFormEvent {
	points: number;
	bonusPoints: number;
}

type IForm = Record<string, IFormEvent>;

interface IProps {
	isOpen: boolean;
	handleClose: () => void;
	event: Event;
	players: IPlayer[];
}

const formatPlayers = (players: IPlayer[], event: Event) => {
	return players.reduce((acc, player) => {
		acc[player.id] = {
			points: player.events[event].points,
			bonusPoints: player.events[event].bonusPoints,
		};
		return acc;
	}, {} as IForm);
};

export const ModalSubmit: React.FC<IProps> = ({ isOpen, handleClose, event, players }) => {
	const defaultValues = formatPlayers(players, event);
	const [formValues, setFormValues] = useState<IForm>(defaultValues);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const formValues = formatPlayers(players, event);
		setFormValues(formValues);
	}, [players, event]);

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const promises = players.map((player) => {
			const { points, bonusPoints } = formValues[player.id];
			return updatePlayer(player.id, {
				events: {
					...player.events,
					[event]: {
						points,
						bonusPoints,
					},
				},
			});
		});

		setIsLoading(true);
		await Promise.all(promises);
		setIsLoading(false);
		handleClose();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, playerId: string, key: keyof IFormEvent) => {
		const value = e.target.valueAsNumber;
		setFormValues((prev) => ({
			...prev,
			[playerId]: {
				...prev[playerId],
				[key]: value,
			},
		}));
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} className="relative z-10 focus:outline-none">
			{/* The backdrop, rendered as a fixed sibling to the panel container */}
			<DialogBackdrop className="fixed inset-0 bg-black/30" />

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				{/* The actual dialog panel  */}
				<DialogPanel className="max-w-lg space-y-4 bg-white p-12">
					<DialogTitle className="font-bold">{EVENT_LABEL_MAP.get(event)}</DialogTitle>
					<p>Please enter the results below:</p>

					<form className="mt-4" onSubmit={submit}>
						<div className="flex items-center gap-4 py-2">
							<div className="flex-1" />
							<div className="w-1/8">
								<p className="text-sm/6 font-medium text-gray-900">Points</p>
							</div>
							<div className="w-1/8">
								<p className="text-sm/6 font-medium text-gray-900">Bonus</p>
							</div>
						</div>
						{players.map((player) => (
							<div key={player.id} className="flex items-center gap-4 border-t border-gray-200 py-2">
								<div className="flex-1">
									<label htmlFor={player.id} className="block text-sm/6 font-medium text-gray-900">
										{player.shortName}
									</label>
								</div>
								<div className="w-1/8">
									<input
										name={`${player.id}_points`}
										type="number"
										placeholder="0"
										className="w-full text-right text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
										value={formValues[player.id].points}
										onChange={(e) => handleChange(e, player.id, "points")}
									/>
								</div>
								<div className="w-1/8">
									<input
										name={`${player.id}_bonusPoints`}
										type="number"
										placeholder="0"
										className="w-full text-right text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
										value={formValues[player.id].bonusPoints}
										onChange={(e) => handleChange(e, player.id, "bonusPoints")}
									/>
								</div>
							</div>
						))}

						<div className="flex justify-center gap-4">
							<Button
								onClick={handleClose}
								className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-gray-400 data-[open]:bg-gray-300"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-blue-700 data-[open]:bg-blue-600"
								disabled={isLoading}
							>
								Submit
							</Button>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
};
