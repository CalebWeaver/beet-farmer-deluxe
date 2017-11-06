LEARN_TO_FARM = wrapEventText("Learn to Farm",
    "Observing the dirt, you notice potential.");

BEETS_BEGIN = wrapEventText("Beets Begin",
    "The richest of men begin with beets.");

HUNGER_SETS_IN = wrapEventText("Hunger Sets In",
    "You seem to be hungry for growth.");

KNOWLEDGE_FARMING_DISCOVERY = wrapEventText("Knowledge of Farming",
    "Keep your head down and eyes on the dirt.");

CROWN_OF_ROOTS = wrapEventText("Crown of Roots",
    "You find a cluster of small beetroots which seem to have shaped themselves into a ring." +
    " It seems to be roughly the size of your head.",
    ["Don the wreath.",
    "These beets belong in the ground."]);

BEET_KING = wrapEventText("King of Beets",
    "You've become more understanding of your subjects.");

FARM_SAVANT = wrapEventText("Farm Savant",
    "Those roots will blossom nicely.");

GAINING_KNOWLEDGE = wrapEventText("Gaining Knowledge",
    "You've come to understand more of what the ground can accommodate. But should you proceed?",
    ["Explore alternative plants",
    "Remain pure"]);

BEET_PURIST = wrapEventText("Beet Purist",
    "A wise decision. Your produce will beet all other.");

VEGETAL_EXPLORATION = wrapEventText("Vegetal Exploration",
    "A bold decision. But will it yield any fruit?");

OFF_TO_MARKET = wrapEventText("Off To Market",
    "It seems you've found something to do with these rubies.");

CENTIPEDES = wrapEventText("Centipedes",
    "Centipedes have overrun your farm and are now eating your beets. (Pest Control: 5)");

CROWS = wrapEventText("Crows",
    "A flock of crows has decided to roost in your fields. Seems they're trying to rook you of your beets.");

POSSESSED_SCARECROW = wrapEventText("Scarecrow",
    "...did that scarecrow just move?");

METEOR = wrapEventText("Meteor",
    "A large meteor just fell from the sky.");

FARM_CHEST = wrapEventText("Chest",
    "You've found a chest while digging in your beet patch");

FARM_REMAINS = wrapEventText("Skull",
    "Seems you've found a small bone-us while trowling around.",
    ["Leave the remains at peace.",
    "This ground is meant for your reds. Dig them up.",
    "Erect a small monument for the lost. - 10 Gold"]);

LEAVE_THE_BONES = wrapEventText("A Modicum of Respect",
"Some things are better left untouched.");

DIG_UP_BONES = wrapEventText("Keep the Soil Pure",
"Only the living matter, and these beets need to grow.");

FARM_MONUMENT = wrapEventText("A Humble Testament",
"You feel uplifted, but you're not sure why.");

BAARDVARK_FARM = wrapEventText("A Curious Minstrel",
"A fellow with a lute strapped to his back and a long snout-like nose wanders up to your farm."+
"He asks if you have some spare food in exchange for some song.",
["Give him some beets and hear his song. -10 Beets",
"Offer him some work. +30 Beets"]);

BAARDVARK_FARM_FEED = wrapEventText("A Happy Player",
"The odd-looking bard thanks you for your generous hospitality and returns the favor with "+
"a song which has a lot to do with spelling.");

BAARDVARK_FARM_WORK = wrapEventText("A Willing Worker",
"The besnouted bard accepts your offer of work and after a long day, takes his share of the profits.");

BEETS_BEYOND = wrapEventText("Beets Beyond",
    "You've found some curious new seeds at the market.");

function wrapEventText(title, description, paths) {
    "use strict";
    return {
        title: title,
        description: description,
        paths: paths
    };
}