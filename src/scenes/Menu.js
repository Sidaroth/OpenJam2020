import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import spriteConfig from 'configs/spriteConfig';

const MenuScene = function MenuSceneFunc() {
    const state = {};
    let titleText;
    let startGame;
    let credits;
    let menuBackground;

    // hook into phasers scene lifecycle.
    function create() {
        console.log('Hei på deg');
        if (!menuBackground) {
            menuBackground = state.addImage(
                gameConfig.GAME.VIEWWIDTH / 2,
                gameConfig.GAME.VIEWHEIGHT / 2,
                spriteConfig.MENU_BACKGROUND.KEY,
            );
        }
        if (!titleText) {
            titleText = state.addText(gameConfig.GAME.VIEWWIDTH / 2, 20, 'OpenJam 2020', gameConfig.TEXT_STYLES.TITLE_TEXT);
            titleText.x -= titleText.width / 2;
        }
        if (!startGame) {
            startGame = state.addText(gameConfig.GAME.VIEWWIDTH / 2, 300, 'Start Game', gameConfig.TEXT_STYLES.MENU_TEXT);
            startGame.x -= startGame.width / 2;
        }
        if (!credits) {
            credits = state.addText(gameConfig.GAME.VIEWWIDTH / 2, 800, 'Credits', gameConfig.TEXT_STYLES.MENU_TEXT);
            credits.x -= credits.width / 2;
        }
    }

    const localState = {
        // methods
        create,
    };

    return createState('Menu', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.MENU),
    });
};

export default MenuScene;
