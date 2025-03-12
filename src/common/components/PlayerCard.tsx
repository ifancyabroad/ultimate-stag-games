import { Link } from "react-router";
import { IPlayer } from "common/utils/types";
import { Attribute } from "common/utils/enums";
import { ATTRIBUTE_LABEL_MAP, CARD_IMAGES } from "common/utils/constants";

export const PlayerCard: React.FC<IPlayer> = (player) => {
	const { id, name, shortName } = player;
	const image = CARD_IMAGES.get(shortName.toLowerCase());

	const getHighestAttributes = (player: IPlayer) => {
		const attributes = Object.values(Attribute);
		const highestValue = Math.max(...attributes.map((attr) => player.attributes[attr]));
		return attributes.filter((attr) => player.attributes[attr] === highestValue);
	};

	const highestAttributes = getHighestAttributes(player);

	return (
		<Link className="player__card__wrapper" to={`/players/${id}`}>
			<div
				className={`player__card__background bg-cover bg-center`}
				style={{
					backgroundImage: `url(${image})`,
				}}
			/>
			<div className="player__card__content">
				<h3 className="text-sm font-medium tracking-wide uppercase">{name}</h3>
				<div className="flex flex-1 flex-col justify-end">
					<p className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
						KEY ATTRIBUTE: {highestAttributes.map((attr) => ATTRIBUTE_LABEL_MAP.get(attr)).join(", ")}
					</p>
				</div>
			</div>
		</Link>
	);
};
