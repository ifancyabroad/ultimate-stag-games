import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Event } from "common/utils/enums";
import { IPlayer } from "common/utils/types";
import { EVENT_LABEL_MAP } from "common/utils/constants";
import { useState } from "react";
import { updatePlayer } from "common/utils/database";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

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

	const handleSubmit = async () => {
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

	const handleAdd = () => {
		setBonusPointsWithModifier((prev) => prev + 1);
	};

	const handleSubtract = () => {
		setBonusPointsWithModifier((prev) => prev - 1);
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} className="relative z-10 focus:outline-none">
			<DialogBackdrop className="fixed inset-0 bg-black/30" />

			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				<DialogPanel className="max-w-lg space-y-4 bg-white p-8">
					<DialogTitle className="font-bold">{EVENT_LABEL_MAP.get(event)}</DialogTitle>
					<p>
						Editing points for <strong>{player.shortName}</strong>:
					</p>

					<div className="mb-4">
						<div className="flex items-stretch">
							<Button
								type="button"
								className="cursor-pointer rounded-l-md bg-gray-300 px-3 py-2 text-sm font-medium text-gray-800 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-gray-400"
								onClick={handleSubtract}
							>
								<MinusIcon className="h-5 w-5" />
							</Button>
							<div className="flex-1 bg-gray-100 px-3 py-2 text-center text-xl font-medium text-gray-800">
								{bonusPointsWithModifier}
							</div>
							<Button
								type="button"
								className="cursor-pointer rounded-r-md bg-gray-300 px-3 py-2 text-sm font-medium text-gray-800 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-gray-400"
								onClick={handleAdd}
							>
								<PlusIcon className="h-5 w-5" />
							</Button>
						</div>
					</div>

					<div className="flex justify-center gap-4">
						<Button
							onClick={handleClose}
							className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-gray-400 data-[open]:bg-gray-300"
						>
							Cancel
						</Button>
						<Button
							type="button"
							className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-blue-700 data-[open]:bg-blue-600"
							onClick={handleSubmit}
							disabled={isDisabled}
						>
							Submit
						</Button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};
