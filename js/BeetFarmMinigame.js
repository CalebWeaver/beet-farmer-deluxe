var beetFarmMinigame = (function(skills, units, settings, stats) {
    'use strict';

    var SEED_COLOR = '#291917';
    var SPROUT_COLOR = '#2C7216';
    var RIPE_COLOR = '#801826';
    var PERFECT_COLOR = '#B9B82F';
    var ROT_COLOR = '#492825';
    var ROT_BORDER_COLOR = '#352821';
    var PLANT_SIZE = '10px';
    var GROW_SIZE = '30px';

    var STAGE_SEEDED = 0;
    var STAGE_SPROUTED = 1;
    var STAGE_PERFECT = 2;
    var STAGE_RIPE = 3;
    var STAGE_ROT = 4;

    var GRID_WIDTH = 2;
    var GRID_HEIGHT = 2;

    var BEET_GROWTH_CONST = 100;

    var beetFarmMinigame = {};
    beetFarmMinigame.harvest = harvest;
    beetFarmMinigame.addBeet = addBeet;

    var farmTracker = {};
    var skills = skills.skills;

    (function() {
        farmTracker.length = 0;
    
        var beetFarmTable = document.getElementsByClassName("beet-farm")[0];
    
        var farmRow = '<tr>';
        var farmRowEnd = '</tr>';
    
        var farm = '';
    
        for (var i = 0; i < GRID_HEIGHT; i++) {
            farm += farmRow;
            for (var j = 0; j < GRID_WIDTH; j++) {
                var beetId = 'beet-'+j+'-'+i;
                farm += createEmptyBeetPlot(beetId);
            }
            farm += farmRowEnd;
        }
    
        beetFarmTable.insertAdjacentHTML('afterbegin', farm);

        setInterval(gameLoop, stats.UPDATE_TICK);
    })();

    return beetFarmMinigame;

    function createEmptyBeetPlot(beetId) {
        return '<td><div id="'+beetId+'" ></div></td>';
    }
    
    function harvest(beetElem) {
        var beet = getBeet(beetElem);
        if (beet.stage == STAGE_RIPE) {
            units.units[BEETS].add(skills[FARMING].level());
        }
        if (beet.stage == STAGE_PERFECT) {
            units.units[BEETS].add(skills[FARMING].level() * 3);
        }

        plantBeet(beetElem);
    }

    function addBeet() {

        var beetCells = document.querySelectorAll(".beet-farm td");
        for (var cell in beetCells) {
            if (cell < beetCells.length) {
                var innerBeet = beetCells[cell].children[0];
                if (!innerBeet.classList.contains('farm-beet')) {

                    addBeetTracker(innerBeet.id);

                    innerBeet.classList.add('farm-beet');
                    innerBeet.addEventListener('click', function() {beetFarmMinigame.harvest(innerBeet)});
                    break;
                }
            }
        }
    }

    function addBeetTracker(beetId) {
        farmTracker.length++;
        farmTracker[beetId] = {};
        farmTracker[beetId].age = 0;
        farmTracker[beetId].stage = STAGE_SEEDED;
        farmTracker[beetId].growthRates = getGrowthRates();
    }

    function plantBeet(beetElem) {
        var beet = getBeet(beetElem);
        beetElem.style.transitionDuration = '0s';
        beetElem.style.width = PLANT_SIZE;
        beetElem.style.height = PLANT_SIZE;
        beetElem.style.backgroundColor = SEED_COLOR;
        beetElem.style.border = '';

        beet.age = 0;
        beet.stage = STAGE_SEEDED;
        beet.growthRates = getGrowthRates();
    }

    function getGrowthRates() {
        var seedTime = 6;
        var sproutTime = 3;
        var perfectTime = 1 + (skills[K_FARMING].level() / 3);
        var ripeTime = 6 * (1 + (skills[K_FARMING].level() / 3));

        return [seedTime, sproutTime, perfectTime, ripeTime];
    }

    function gameLoop() {
        var beets = document.getElementsByClassName('farm-beet');
        checkAddBeet();
        [].slice.call(beets).map(grow);
    }

    function checkAddBeet() {
        if (farmTracker.length < getGridSize() && farmTracker.length < skills[FARMING].level() / 3) {
            addBeet();
        }
    }

    function grow(beetElem) {
        var beet = getBeet(beetElem);
        if (beet.age < beet.growthRates[beet.stage] + 1) {
            beet.age += getFarmingGrowth();
            setBeetStage(beet);
            setBeetStyle(beetElem);
        }
    }

    function getFarmingGrowth() {
        var farmingGrowth = 1/BEET_GROWTH_CONST;
        return farmingGrowth;
    }

    function setBeetStage(beet) {
        if (beet.age >= beet.growthRates[beet.stage]) {

            if (beet.stage == STAGE_SEEDED) {
                beet.stage = STAGE_SPROUTED;
            } else if (beet.stage == STAGE_SPROUTED) {
                beet.stage = STAGE_PERFECT;
            } else if (beet.stage == STAGE_PERFECT) {
                beet.stage = STAGE_RIPE;
            } else if (beet.stage == STAGE_RIPE) {
                beet.stage = STAGE_ROT;
            }

            beet.age = 0;
        }
    }

    function getTransitionDuration(beet) {
        return (beet.growthRates[beet.stage] / getFarmingGrowth()) / (1000 / stats.UPDATE_TICK)+'s';
    }

    function setBeetStyle(beetElem) {

        var beet = farmTracker[beetElem.id];

        if (beet.stage == STAGE_SEEDED && getTransitionDuration(beet) != '0s') {
            beetElem.style.transitionDuration = getTransitionDuration(beet);
            beetElem.style.width = PLANT_SIZE;
            beetElem.style.height = PLANT_SIZE;
            beetElem.style.backgroundColor = SPROUT_COLOR;
        } else if (beet.stage == STAGE_SPROUTED) {
            beetElem.style.transitionDuration = getTransitionDuration(beet);
            beetElem.style.width = GROW_SIZE;
            beetElem.style.height = GROW_SIZE;
            beetElem.style.backgroundColor = RIPE_COLOR;
        } else if (beet.stage == STAGE_PERFECT) {
            beetElem.style.border = '2px solid '+PERFECT_COLOR;
        } else if (beet.stage == STAGE_RIPE) {
            beetElem.style.transitionDuration = getTransitionDuration(beet);
            beetElem.style.backgroundColor = ROT_COLOR;
            beetElem.style.border = '2px solid '+SPROUT_COLOR;
        } else if (beet.stage == STAGE_ROT) {
            beetElem.style.border = '2px solid '+ROT_BORDER_COLOR;
        }
    }

    function getBeet(beetElem) {
        return farmTracker[beetElem.id];
    }

    function getGridSize() {
        return GRID_HEIGHT * GRID_WIDTH;
    }
})(Skills, Units, Settings, StatisticTracker);