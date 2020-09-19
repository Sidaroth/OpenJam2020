import gameConfig from 'configs/gameConfig';
import AudioManager from 'core/createAudioManager';
import UI from 'scenes/UI';
import canListen from 'components/events/canListen';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import store from 'root/store';
import hasCamera from 'components/hasCamera';
import MenuScene from 'scenes/Menu';
import CreditsScene from 'scenes/Credits';
import eventConfig from 'configs/eventConfig';
import Level1 from './Level1';
import createMouseInput from 'core/createMouse';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
const Game = function GameFunc() {
    const state = {};
    let audioManager;
    let UIContainer;
    let credits;
    let menu;
    let level1;

    const mouse = createMouseInput();

    function cameraSetup() {
        state.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        state.setZoom(0.8);
    }

    function startGame() {
        level1 = Level1();
        state.addScene(gameConfig.SCENES.LEVEL1, level1.scene, true);
        if (menu) state.removeScene(menu.scene);
    }

    function openCredits() {
        credits = CreditsScene();
        state.addScene(gameConfig.SCENES.CREDITS, credits.scene, true);
        state.listenOn(credits, eventConfig.MENU.CREDITS_CLOSE, state.closeCredits);
        state.removeScene(menu.scene);
    }

    function openMenu() {
        menu = MenuScene();
        state.addScene(gameConfig.SCENES.MENU, menu.scene, true);
        state.listenOn(menu, eventConfig.MENU.GAME_START, startGame);
        state.listenOn(menu, eventConfig.MENU.CREDITS_OPEN, openCredits);
    }

    function closeCredits() {
        openMenu();
        state.removeScene(credits.scene);
    }

    function init() {
        // After assets are loaded.

        UIContainer = UI();
        state.addScene(gameConfig.SCENES.UI, UIContainer.scene, true);

        audioManager = AudioManager(UIContainer.scene);
        store.audioManager = audioManager;
        store.ui = UIContainer;

        // Swap these for fast entry.
        // openMenu();
        mouse.enable(state.scene);
        startGame();
    }

    function create() {
        audioManager.playMusic();
        cameraSetup();
    }

    function update(time) {
        return time;
    }

    function destroy() {
        mouse.disable(state.scene);
        if (UIContainer) UIContainer.destroy();
        if (menu) menu.destroy();
        if (credits) credits.destroy();
    }

    const localState = {
        // props
        // methods
        closeCredits,
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
