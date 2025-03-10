import { Link } from "react-router";
import { IPlayer } from "common/utils/types";
import { Attribute } from "common/utils/enums";
import { ATTRIBUTE_LABEL_MAP } from "common/utils/constants";

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
				<h3 className="text-sm font-medium tracking-wide uppercase">{name}</h3>
				<div className="flex flex-1 flex-col justify-end">
					<p className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
						KEY ATTRIBUTE: {highestAttributeLabel}
					</p>
				</div>
			</div>
		</Link>
	);
};
