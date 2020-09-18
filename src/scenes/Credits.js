import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';

const CreditsScene = function CreditsSceneFunc() {
    const state = {};
    let creditText;

    function create() {
        if (!creditText) {
            creditText = state.add.text(10, 20, 'Credits\nSidaroth\nGarlov\nKjetilgr', gameConfig.TEXT_STYLES.DEFAULT);
        }
    }

    const localState = {
        // methods
        create,
    };

    return createState('Credits', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.CREDITS),
    });
};
