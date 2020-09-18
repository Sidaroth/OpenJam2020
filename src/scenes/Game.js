import gameConfig from 'configs/gameConfig';
import AudioManager from 'core/createAudioManager';
import UI from 'scenes/UI';
import canListen from 'components/events/canListen';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import store from 'root/store';
import hasCamera from 'components/hasCamera';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
const Game = function GameFunc() {
    const state = {};
    let audioManager;
    let UIContainer;

    function cameraSetup() {
        state.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        state.setZoom(0.8);
    }


    function init() {
        // After assets are loaded.
        UIContainer = UI();
        state.addScene(gameConfig.SCENES.UI, UIContainer.scene, true);
        audioManager = AudioManager(UIContainer.scene);
        store.audioManager = audioManager;
    }

    function create() {
        audioManager.playMusic();
        cameraSetup();
    }

    function update(time, delta) {}

    function destroy() {
        if (UIContainer) UIContainer.destroy();
    }

    const localState = {
        // props
        // methods
        init,
        create,
        update,
        destroy,
    };

    return createState('Game', state, {
        localState,
        canListen: canListen(state),
        isScene: isScene(state, gameConfig.SCENES.GAME),
        hasCamera: hasCamera(state),
    });
};

export default Game;
