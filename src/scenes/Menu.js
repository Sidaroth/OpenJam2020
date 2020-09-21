import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import spriteConfig from 'configs/spriteConfig';
import createButton from 'entities/createButton';
import canListen from 'components/events/canListen';
import canEmit from 'components/events/canEmit';
import eventConfig from 'configs/eventConfig';

const MenuScene = function MenuSceneFunc() {
    const state = {};
    let titleText;
    let startGame;
    let credits;
    let menuBackground;

    // hook into phasers scene lifecycle.
    function create() {
        if (!menuBackground) {
            menuBackground = state.addImage(
                gameConfig.GAME.VIEWWIDTH / 2,
                gameConfig.GAME.VIEWHEIGHT / 2,
                spriteConfig.MENU_BACKGROUND.KEY,
            );
            menuBackground.setDisplaySize(gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        }
        if (!titleText) {
            titleText = state.addText(gameConfig.GAME.VIEWWIDTH / 2, 20, 'OpenJam 2020', gameConfig.TEXT_STYLES.TITLE_TEXT);
            titleText.x -= titleText.width / 2;
        }
        if (!startGame) {
            startGame = createButton(state.scene, {
                size: gameConfig.BUTTON.DEFAULT_SIZE,
                position: { x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT / 2 },
                text: 'Start game',
            });
            state.listenOn(startGame, eventConfig.BUTTON.CLICK, () => {
                state.emit(eventConfig.MENU.GAME_START);
            });
        }
        if (!credits) {
            credits = createButton(state.scene, {
                size: gameConfig.BUTTON.DEFAULT_SIZE,
                position: { x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT / 2 + 125 },
                text: 'Credits',
            });
            state.listenOn(credits, eventConfig.BUTTON.CLICK, () => {
                state.emit(eventConfig.MENU.CREDITS_OPEN);
            });
        }
    }

    function destroy() {
        if (menuBackground) menuBackground.destroy();
    }

    const localState = {
        // methods
        create,
        destroy,
    };

    return createState('Menu', state, {
        localState,
        canListen: canListen(state),
        canEmit: canEmit(state),
        isScene: isScene(state, gameConfig.SCENES.MENU),
    });
};

export default MenuScene;
