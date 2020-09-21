import Phaser from 'phaser';

/**
 * Phaser.Scene abstraction.
 * Init -> Preload -> Create -> Update -> Destroy
 */
const isScene = function isSceneFunc(state, sceneKey) {
    if (!sceneKey) {
        throw new Error('Missing sceneKey');
    }

    let scene = new Phaser.Scene(sceneKey);

    // ------ Hook into phasers scene lifecycle -------
    scene.init = () => {
        // The ScenePlugin/Manager is not ready until init has run internally.
        state.sceneManager = scene.scene;
        if (state.init) state.init();
    };

    scene.preload = () => {
        if (state.preload) state.preload();
    };

    scene.create = () => {
        if (state.create) state.create();
    };

    scene.update = (time, delta) => {
        if (state.update) state.update({ runTime: time, delta });
    };

    // --------------------------------------

    function addScene(key, sceneRef, autoStart) {
        return state.sceneManager.add(key, sceneRef, autoStart);
    }

    function removeScene(key) {
        state.sceneManager.remove(key);
    }

    function addImage(x, y, key, frame = undefined) {
        return scene.add.image(x, y, key, frame);
    }

    function addText(x, y, text, style) {
        return scene.add.text(x, y, text, style);
    }

    function removeChild(key) {
        const child = scene[key];
        if (child) child.destroy();
    }

    function destroy() {
        state.sceneManager.remove(sceneKey);
        scene = null;
    }

    return {
        sceneManager: undefined,
        scene,
        addScene,
        removeScene,
        addImage,
        addText,
        removeChild,
        destroy,
    };
};

export default isScene;
