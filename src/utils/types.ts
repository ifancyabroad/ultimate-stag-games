import { Attribute } from "./enums";

export interface IPlayer {
	id: string;
	name: string;
	shortName: string;
	description: string;
	attributes: Record<Attribute, number>;
	power: string;
	slug: string;
	points: number;
}
