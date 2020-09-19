import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import canListen from 'components/events/canListen';
import canEmit from 'components/events/canEmit';
import Background from './Background';
import createSeed from 'entities/createSeed';
import store from 'root/store';
import createTree from 'entities/createTree';
import createWindRegion from 'entities/createWindRegion';

const Level1 = function Level1Func() {
    const state = {};

    let background;
    let seed;
    let tree;

    const widthRegions = 5;
    const heightRegions = 5;
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
        tree = createTree();

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
    }

    function update(time) {
        seed.update(time);
        tree.update(time);
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
