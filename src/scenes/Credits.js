import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import spriteConfig from 'configs/spriteConfig';
import createState from 'utils/createState';
import createButton from 'entities/createButton';
import eventConfig from 'configs/eventConfig';
import canListen from 'components/events/canListen';
import canEmit from 'components/events/canEmit';


const CreditsScene = function CreditsSceneFunc() {
    const state = {};
    let creditText;
    let creditBackground;
    let exitCredits;

    function create() {
        if (!creditBackground) {
            creditBackground = state.addImage(
                gameConfig.GAME.VIEWWIDTH / 2,
                gameConfig.GAME.VIEWHEIGHT / 2,
                spriteConfig.MENU_BACKGROUND.KEY,
            );
        }
        if (!creditText) {
            creditText = state.addText(gameConfig.GAME.VIEWWIDTH / 2, gameConfig.GAME.VIEWHEIGHT / 3, 'Credits:\nSidaroth\nGarlov\nKjetilgr', gameConfig.TEXT_STYLES.DEFAULT);
            creditText.x -= creditText.width / 2;
        }
        if (!exitCredits) {
            exitCredits = createButton(state.scene, {
                size: gameConfig.BUTTON.DEFAULT_SIZE,
                position: { x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT - gameConfig.BUTTON.DEFAULT_SIZE.h - 10 },
                text: 'Exit',
            });
            state.listenOn(exitCredits, eventConfig.BUTTON.CLICK, () => {
                state.emit(eventConfig.MENU.CREDITS_CLOSE);
            });
        }
    }

    const localState = {
        // methods
        create,
    };

    return createState('Credits', state, {
        localState,
        canListen: canListen(state),
        canEmit: canEmit(state),
        isScene: isScene(state, gameConfig.SCENES.CREDITS),
    });
};

export default CreditsScene;
