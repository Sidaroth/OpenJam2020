import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import canListen from 'components/events/canListen';
import canEmit from 'components/events/canEmit';
import Background from './Background';
import createSeed from 'entities/createSeed';
import store from 'root/store';
import createTreeManager from 'core/createTreeManager';
import createWindRegion from 'entities/createWindRegion';

const Level1 = function Level1Func() {
    const state = {};

    let background;
    let seed;
    let treeManager;
    let timeSinceLastUpdate = Infinity;

    const widthRegions = 15;
    const heightRegions = 8;
    const regions = [];
    const levelName = 'Level 1';
    const lifetimeUpdateThreshold = 100;

    function init() {
        background = Background();
        state.addScene(gameConfig.SCENES.BACKGROUND, background.scene, true);
        state.sceneManager.sendToBack(gameConfig.SCENES.BACKGROUND);
        store.currentLevel = state;
        store.speed = 0.125;
    }

    // hook into phasers scene lifecycle.
    function create() {
        seed = createSeed();
        store.seed = seed;
        treeManager = createTreeManager();

        for (let i = 0; i < heightRegions; i += 1) {
            for (let j = 0; j < widthRegions; j += 1) {
                const region = createWindRegion();
                region.setPosition({ x: j * gameConfig.GAME.VIEWWIDTH / widthRegions, y: i * gameConfig.GAME.VIEWHEIGHT / heightRegions });
                region.setSize({ w: gameConfig.GAME.VIEWWIDTH / widthRegions, h: gameConfig.GAME.VIEWHEIGHT / heightRegions });
                regions.push(region);
            }
            // Lazy extra region per row. TL;DR We put 1 extra wind region outside the camera view so we can parallax them cleanly.
            const region = createWindRegion();
            region.setSize({ w: gameConfig.GAME.VIEWWIDTH / widthRegions, h: gameConfig.GAME.VIEWHEIGHT / heightRegions });
            region.setPosition({ x: 0, y: i * gameConfig.GAME.VIEWHEIGHT / heightRegions });
            region.moveToBack();
            regions.push(region);
        }
        store.ui.setCurrentLevelText(levelName);
    }

    function updateLifetime(time) {
        timeSinceLastUpdate += time.delta;
        if (timeSinceLastUpdate >= lifetimeUpdateThreshold) {
            const timeInSeconds = seed.getLifetime() / 1000;
            store.ui.updateLifetimeText(timeInSeconds.toFixed(2));
        }
    }

    function update(time) {
        seed.update(time);
        updateLifetime(time);
        treeManager.update(time);
        regions.forEach(region => region.update(time));
        return time;
    }

    function destroy() {
        if (background) {
            background.destroy();
            background = null;
        }

        store.currentLevel = null;
    }

    const localState = {
        // methods
        init,
        create,
        update,
        destroy,
    };

    return createState('Menu', state, {
        localState,
        canListen: canListen(state),
        canEmit: canEmit(state),
        isScene: isScene(state, gameConfig.SCENES.LEVEL1),
    });
};

export default Level1;
