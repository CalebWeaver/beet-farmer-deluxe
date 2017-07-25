let BeetFarmMinigame = (function(skills, units, upgrades, generator, player, settings, stats) {
    'use strict';

    let SEED_COLOR = '#291917';
    let SPROUT_COLOR = '#2C7216';
    let RIPE_COLOR = '#801826';
    let PERFECT_COLOR = '#B9B82F';
    let ROT_COLOR = '#492825';
    let ROT_BORDER_COLOR = '#352821';
    let PLANT_SIZE = '10px';
    let GROW_SIZE = '30px';

    let STAGE_SEEDED = 0;
    let STAGE_SPROUTED = 1;
    let STAGE_PERFECT = 2;
    let STAGE_RIPE = 3;
    let STAGE_ROT = 4;

    let GRID_WIDTH = 0;
    let GRID_HEIGHT = 0;

    let BEET_GROWTH_CONST = 70;

    let beetFarmMinigame = {};
    beetFarmMinigame.harvest = harvest;
    beetFarmMinigame.fillBeets = fillBeets;
    beetFarmMinigame.GRID_WIDTH = GRID_WIDTH;
    beetFarmMinigame.GRID_HEIGHT = GRID_HEIGHT;

    let farmTracker = {};

    (function() {
        farmTracker.length = 0;
    
        createBeetFarm();

        setInterval(gameLoop, stats.UPDATE_TICK);
    })();

    return beetFarmMinigame;

    function createBeetFarm() {

        let beetFarmTable = document.getElementsByClassName("beet-farm")[0];
        beetFarmTable.innerHTML = '';

        let farmRow = '<tr>';
        let farmRowEnd = '</tr>';

        let farm = '';

        for (let i = 0; i < beetFarmMinigame.GRID_HEIGHT; i++) {
            farm += farmRow;
            for (let j = 0; j < beetFarmMinigame.GRID_WIDTH; j++) {
                let beetId = 'beet-'+j+'-'+i;
                farm += createEmptyBeetPlot(beetId);
            }
            farm += farmRowEnd;
        }

        beetFarmTable.insertAdjacentHTML('afterbegin', farm);
    }

    function createEmptyBeetPlot(beetId) {
        return '<td><div id="'+beetId+'" ></div></td>';
    }
    
    function harvest(beetElem) {
        let beet = getBeet(beetElem);
        if (beet.stage == STAGE_RIPE) {
            units[BEETS].add(generator[BEETS]() * stats.TICK_PER_SECOND * 3);
            player.gainXp(5);
        }
        if (beet.stage == STAGE_PERFECT) {
            units[BEETS].add(generator[BEETS]() * stats.TICK_PER_SECOND * 6);
            player.gainXp(15);
        }

        plantBeet(beetElem);
    }

    function fillBeets() {

        let beetCells = document.querySelectorAll(".beet-farm td");
        for (let cell in beetCells) {
            if (cell < beetCells.length) {
                let innerBeet = beetCells[cell].children[0];
                if (!innerBeet.classList.contains('farm-beet')) {

                    addBeetTracker(innerBeet.id);

                    innerBeet.classList.add('farm-beet');
                    innerBeet.addEventListener('click', function() {beetFarmMinigame.harvest(innerBeet)});
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
        let beet = getBeet(beetElem);
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
        // BEET_GROWTH_CONST * (seedTime + sproutTime) = time to perfect in ms
        let seedTime = 6;
        let sproutTime = 3;
        let perfectTime = 1 + (skills[K_FARMING].level() / 3);
        let ripeTime = 5 * (1 + (skills[K_FARMING].level() / 3));

        return [seedTime, sproutTime, perfectTime, ripeTime];
    }

    function gameLoop() {
        let beets = document.getElementsByClassName('farm-beet');
        checkAddBeet();
        [].slice.call(beets).map(grow);
    }

    function checkAddBeet() {
        if (farmTracker.length < getGridSize()) {
            createBeetFarm();
            fillBeets();
        }
    }

    function grow(beetElem) {
        let beet = getBeet(beetElem);
        if (beet.age < beet.growthRates[beet.stage] + 1) {
            beet.age += getFarmingGrowth();
            setBeetStage(beet);
            setBeetStyle(beetElem);
        }
    }

    function getFarmingGrowth() {
        let farmingGrowth = 1/BEET_GROWTH_CONST;
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

        let beet = farmTracker[beetElem.id];

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
        return beetFarmMinigame.GRID_HEIGHT * beetFarmMinigame.GRID_WIDTH;
    }
})(Skills, Units, Upgrades, Generator, Player, Settings, StatisticTracker);