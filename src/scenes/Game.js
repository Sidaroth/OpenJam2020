import gameConfig from 'configs/gameConfig';
import AudioManager from 'core/createAudioManager';
import UI from 'scenes/UI';
import canListen from 'components/events/canListen';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import store from 'root/store';
import hasCamera from 'components/hasCamera';
import Background from 'scenes/Background';
import MenuScene from 'scenes/Menu';
import CreditsScene from 'scenes/Credits';
import eventConfig from 'configs/eventConfig';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
const Game = function GameFunc() {
    const state = {};
    let audioManager;
    let UIContainer;
    let credits;
    let backgroundScene;
    let menu;

    function cameraSetup() {
        state.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        state.setZoom(0.8);
    }

    function startGame() {
        console.log('Start game');
    }

    function openCredits() {
        console.log('Open credits');
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
        backgroundScene = Background();
        state.addScene(gameConfig.SCENES.BACKGROUND, backgroundScene.scene, true);
        openMenu();
        UIContainer = UI();
        state.addScene(gameConfig.SCENES.UI, UIContainer.scene, true);
        audioManager = AudioManager(UIContainer.scene);
        store.audioManager = audioManager;
    }

    function create() {
        audioManager.playMusic();
        cameraSetup();
    }

    function update(time) {
        return time;
    }

    function destroy() {
        if (UIContainer) UIContainer.destroy();
        if (backgroundScene) {
            backgroundScene.destroy();
            backgroundScene = null;
        }
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
