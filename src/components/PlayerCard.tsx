import { Link } from "react-router";
import { IPlayer } from "../utils/types";
import { Attribute } from "../utils/enums";
import { ATTRIBUTE_LABEL_MAP } from "../utils/constants";

export const PlayerCard: React.FC<IPlayer> = (player) => {
	const { id, name } = player;

	const getHighestAttribute = (player: IPlayer) => {
		const { attributes } = player;
		const highestAttributeKey = Object.keys(attributes).reduce((a, b) =>
			attributes[a as Attribute] > attributes[b as Attribute] ? a : b,
		);
		return highestAttributeKey as Attribute;
	};

	const highestAttribute = getHighestAttribute(player);
	const highestAttributeLabel = ATTRIBUTE_LABEL_MAP.get(highestAttribute);

	return (
		<Link className="player__card__wrapper" to={`/players/${id}`}>
			<div className="player__card__background">
				<p className="text-xl">Image</p>
			</div>
			<div className="player__card__content">
				<h3 className="text-sm font-medium uppercase tracking-wide">{name}</h3>
				<div className="flex-1 flex flex-col justify-end">
					<p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">
						KEY ATTRIBUTE: {highestAttributeLabel}
					</p>
				</div>
			</div>
		</Link>
	);
};
