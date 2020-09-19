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

    const widthRegions = 4;
    const heightRegions = 4;
    const regions = [];

    function init() {
        background = Background();
        state.addScene(gameConfig.SCENES.BACKGROUND, background.scene, true);
        state.sceneManager.sendToBack(gameConfig.SCENES.BACKGROUND);
        store.currentLevel = state;
        store.speed = 0.25;
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
        }
    }

    function update(time) {
        seed.update(time.delta);
        treeManager.update(time);
        regions.forEach(region => region.update(time.delta));
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
