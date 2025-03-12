import { Attribute, Event } from "./enums";

export interface IEvent {
	points: number;
	bonusPoints: number;
}

export interface IPower {
	name: string;
	description: string;
}

export interface IPlayer {
	id: string;
	name: string;
	shortName: string;
	description: string;
	attributes: Record<Attribute, number>;
	power: IPower;
	secretPower?: IPower;
	slug: string;
	events: Record<Event, IEvent>;
}
