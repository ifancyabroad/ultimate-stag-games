import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Event } from "common/utils/enums";
import { IPlayer } from "common/utils/types";
import { EVENT_LABEL_MAP } from "common/utils/constants";
import { useState } from "react";
import { updatePlayer } from "common/utils/database";

interface IProps {
	isOpen: boolean;
	handleClose: () => void;
	event: Event;
	player: IPlayer;
}

export const ModalModifier: React.FC<IProps> = ({ isOpen, handleClose, event, player }) => {
	const defaultValue = player.events[event].bonusPoints + player.events[event].bonusPointsModifier;
	const [bonusPointsWithModifier, setBonusPointsWithModifier] = useState<number>(defaultValue);
	const [isLoading, setIsLoading] = useState(false);
	const isDisabled = isLoading || isNaN(bonusPointsWithModifier);

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsLoading(true);

		const bonusPointsModifier = bonusPointsWithModifier - player.events[event].bonusPoints;

		await updatePlayer(player.id, {
			...player,
			events: {
				...player.events,
				[event]: {
					...player.events[event],
					bonusPointsModifier,
				},
			},
		});

		setIsLoading(false);
		handleClose();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.valueAsNumber;
		setBonusPointsWithModifier(value);
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} className="relative z-10 focus:outline-none">
			<DialogBackdrop className="fixed inset-0 bg-black/30" />

			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				<DialogPanel className="max-w-lg space-y-4 bg-white p-12">
					<DialogTitle className="font-bold">{EVENT_LABEL_MAP.get(event)}</DialogTitle>
					<p>Editing points for {player.shortName} :</p>

					<form onSubmit={submit}>
						<div className="mb-4">
							<input
								name={`${player.id}_bonusPoints`}
								type="number"
								placeholder="0"
								className="w-full text-right text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
								value={bonusPointsWithModifier}
								onChange={handleChange}
							/>
						</div>

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
								disabled={isDisabled}
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
