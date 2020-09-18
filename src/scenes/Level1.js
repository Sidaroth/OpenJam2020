import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import canListen from 'components/events/canListen';
import canEmit from 'components/events/canEmit';
import Background from './Background';

const Level1 = function Level1Func() {
    const state = {};
    let background;

    function init() {
        background = Background();
        state.addScene(gameConfig.SCENES.BACKGROUND, background.scene, true);
    }

    // hook into phasers scene lifecycle.
    function create() {
    }

    function destroy() {
        if (background) {
            background.destroy();
            background = null;
        }
    }

    const localState = {
        // methods
        init,
        create,
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
