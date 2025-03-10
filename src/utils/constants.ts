import { Attribute, Event } from "./enums";

export const ATTRIBUTE_COLOUR_MAP = new Map([
	[Attribute.Strength, "bg-orange-500"],
	[Attribute.Endurance, "bg-green-500"],
	[Attribute.Strategy, "bg-blue-500"],
	[Attribute.Integrity, "bg-purple-500"],
	[Attribute.Luck, "bg-yellow-500"],
]);

export const ATTRIBUTE_LABEL_MAP = new Map([
	[Attribute.Strength, "Strength"],
	[Attribute.Endurance, "Endurance"],
	[Attribute.Strategy, "Strategy"],
	[Attribute.Integrity, "Integrity"],
	[Attribute.Luck, "Luck"],
]);

export const ATTRIBUTES = [
	Attribute.Strength,
	Attribute.Endurance,
	Attribute.Strategy,
	Attribute.Integrity,
	Attribute.Luck,
];

export const EVENT_LABEL_MAP = new Map([
	[Event.Parkrun, "Parkrun"],
	[Event.Axeperience, "Axeperience"],
	[Event.BadMoon, "Bad Moon"],
	[Event.FourQuarters, "Four Quarters"],
]);

export const EVENTS = [Event.Parkrun, Event.Axeperience, Event.BadMoon, Event.FourQuarters];
