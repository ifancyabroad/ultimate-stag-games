import { Attribute, Event } from "./enums";
import ritchieMain from "assets/images/main/ritchie.jpg";
import mikeMain from "assets/images/main/mike.jpg";
import edgarMain from "assets/images/main/edgar.jpg";
import scottMain from "assets/images/main/scott.jpg";
import alfMain from "assets/images/main/alf.jpg";
import ritchieCard from "assets/images/card/ritchie.jpg";
import mikeCard from "assets/images/card/mike.jpg";
import edgarCard from "assets/images/card/edgar.jpg";
import scottCard from "assets/images/card/scott.jpg";
import alfCard from "assets/images/card/alf.jpg";

export const ATTRIBUTE_COLOUR_MAP = new Map([
	[Attribute.Strength, "bg-orange-500"],
	[Attribute.Endurance, "bg-green-500"],
	[Attribute.Strategy, "bg-blue-500"],
	[Attribute.Persuasion, "bg-purple-500"],
	[Attribute.Luck, "bg-yellow-500"],
]);

export const ATTRIBUTE_LABEL_MAP = new Map([
	[Attribute.Strength, "Strength"],
	[Attribute.Endurance, "Endurance"],
	[Attribute.Strategy, "Strategy"],
	[Attribute.Persuasion, "Persuasion"],
	[Attribute.Luck, "Luck"],
]);

export const ATTRIBUTES = [
	Attribute.Strength,
	Attribute.Endurance,
	Attribute.Strategy,
	Attribute.Persuasion,
	Attribute.Luck,
];

export const EVENT_LABEL_MAP = new Map([
	[Event.Parkrun, "Parkrun"],
	[Event.Axeperience, "Axeperience"],
	[Event.BadMoon, "Bad Moon"],
	[Event.FourQuarters, "Four Quarters"],
]);

export const EVENTS = [Event.Parkrun, Event.Axeperience, Event.BadMoon, Event.FourQuarters];

export const MAIN_IMAGES = new Map([
	["ritchie", ritchieMain],
	["mike", mikeMain],
	["edgar", edgarMain],
	["scott", scottMain],
	["alf", alfMain],
]);

export const CARD_IMAGES = new Map([
	["ritchie", ritchieCard],
	["mike", mikeCard],
	["edgar", edgarCard],
	["scott", scottCard],
	["alf", alfCard],
]);
