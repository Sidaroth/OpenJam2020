import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';

const CreditsScene = function CreditsSceneFunc() {
    const state = {};
    let creditText;

    function create() {
        if (!creditText) {
            creditText = state.addText(gameConfig.GAME.VIEWWIDTH / 2, gameConfig.GAME.VIEWHEIGHT / 3, 'Credits\nSidaroth\nGarlov\nKjetilgr', gameConfig.TEXT_STYLES.DEFAULT);
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

export default CreditsScene;
