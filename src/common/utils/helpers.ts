import { Event } from "./enums";
import { IPlayer } from "./types";

export const getBonusModifier = (player: IPlayer, event: Event) => {
	const { bonusPointsModifier } = player.events[event];
	return player.applyBonusModifiers ? bonusPointsModifier : 0;
};
