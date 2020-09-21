// import * as dat from 'dat.gui';
import Stats from 'stats-js';
import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import * as Phaser from 'phaser';

/**
 * Layer/Scene for UI elements.
 */

const UI = function UIFunc() {
    const state = {};
    let gui;
    let stats;
    let currentLevelText;
    let currentLifetimeText;
    let previousGameScore;

    // function setupDatGui() {
    //     gui = new dat.GUI();
    //     gui.addFolder('Test folder');

    //     state.guiData = {
    //         name: 'name',
    //     };
    //     const guiController = gui.add(state.guiData, 'name');
    //     guiController.onFinishChange((name) => {
    //         console.log(name);
    //     });
    // }

    function setupPerformanceStats() {
        stats = new Stats();
        stats.setMode(0);

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.body.appendChild(stats.domElement);

        // TODO cleanup listeners
        state.scene.events.on('preupdate', () => {
            stats.begin();
        });
        state.scene.events.on('postupdate', () => {
            stats.end();
        });
    }

    function setCurrentLevelText(text) {
        currentLevelText.text = text;
        currentLevelText.visible = true;
    }

    function updateLifetimeText(text) {
        currentLifetimeText.text = text;
        currentLifetimeText.visible = true;
        previousGameScore.text = `Score previous game: ${text}`;
    }

    function hideLevelText() {
        currentLifetimeText.visible = false;
        currentLevelText.visible = false;
    }

    function showScore() {
        state.sceneManager.bringToTop(gameConfig.SCENES.UI);
        previousGameScore.x = gameConfig.GAME.VIEWWIDTH / 2 - previousGameScore.width / 2;
        previousGameScore.y = gameConfig.GAME.VIEWHEIGHT * 0.75 - previousGameScore.height / 2;
        previousGameScore.visible = true;
    }

    function hideScore() {
        previousGameScore.visible = false;
    }

    function create() {
        // setupDatGui();
        // setupPerformanceStats();

        if (!currentLevelText) {
            currentLevelText = state.addText(gameConfig.UI_DEFAULT.padding.x, gameConfig.UI_DEFAULT.padding.y, 'Current level', gameConfig.TEXT_STYLES.UI_TEXT);
            currentLevelText.visible = false;
        }
        if (!currentLifetimeText) {
            currentLifetimeText = state.addText(currentLevelText.x, currentLevelText.y + currentLevelText.height + 10, '', gameConfig.TEXT_STYLES.UI_TEXT);
            currentLifetimeText.visible = false;
        }
        if (!previousGameScore) {
            previousGameScore = state.addText(0, 0, '', gameConfig.TEXT_STYLES.UI_TEXT);
            previousGameScore.visible = false;
        }
    }

    function destroy() {
        gui.destroy();
        stats.end();
        document.body.removeChild(stats);
    }

    const localState = {
        // methods
        setCurrentLevelText,
        updateLifetimeText,
        hideLevelText,
        create,
        showScore,
        hideScore,
        destroy,
    };

    return createState('UIScene', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.UI),
    });
};

export default UI;
