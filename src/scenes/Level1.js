import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import canListen from 'components/events/canListen';
import canEmit from 'components/events/canEmit';
import Background from './Background';
import createSeed from 'entities/createSeed';
import store from 'root/store';
import createTreeManager from 'core/createTreeManager';

const Level1 = function Level1Func() {
    const state = {};

    let background;
    let seed;
    let treeManager;

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
        treeManager = createTreeManager();
    }

    function update(time) {
        seed.update(time.delta);
        treeManager.update(time);
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
