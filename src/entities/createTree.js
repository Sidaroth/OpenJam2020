import hasCollider from 'components/entities/hasCollider';
import hasSprite from 'components/entities/hasSprite';
import isGameEntity from 'components/entities/isGameEntity';
import canEmit from 'components/events/canEmit';
import hasPosition from 'components/hasPosition';
import gameConfig from 'configs/gameConfig';
import spriteConfig from 'configs/spriteConfig';
import store from 'root/store';
import getRandomInt from 'utils/math/getRandomInt';

const { default: createState } = require('utils/createState');

const createTree = function createTreeFunc() {
    const state = {};

    const TREE_KEYS = {
        0: spriteConfig.TREE_1.KEY,
        1: spriteConfig.TREE_2.KEY,
        2: spriteConfig.TREE_3.KEY,
        3: spriteConfig.TREE_4.KEY,
    };

    function __constructor() {
        state.createSpriteFromKey(store.currentLevel.scene, TREE_KEYS[getRandomInt(0, 3)]);
        state.setPosition({ x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT / 2 });
    }

    function update(time) {
        state.setX(state.getX() - store.speed * time.delta);
        return time;
    }

    const localState = {
        // props

        // methods
        __constructor,
        update,
    };
    return createState('Tree', state, {
        localState,
        isGameEntity: isGameEntity(state),
        canEmit: canEmit(state),
        hasSprite: hasSprite(state),
        hasPosition: hasPosition(state),
        hasCollider: hasCollider(state, gameConfig.COLLIDERS.OBSTACLE),
    });
};

export default createTree;
