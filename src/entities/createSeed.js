import isGameEntity from 'components/entities/isGameEntity';
import canEmit from 'components/events/canEmit';
import hasPosition from 'components/hasPosition';
import createState from 'utils/createState';
import hasAudio from 'components/hasAudio';
import hasPhysicsBody from 'components/hasPhysicsBody';
import hasSprite from 'components/entities/hasSprite';
import gameConfig from 'configs/gameConfig';
import spriteConfig from 'configs/spriteConfig';
import store from 'root/store';
import hasLifetime from 'components/entities/hasLifetime';
import hasCollider from 'components/entities/hasCollider';

const createSeed = function createSeedFunc() {
    const state = {};

    function __constructor() {
        state.createSpriteFromKey(store.currentLevel.scene, spriteConfig.SEED.KEY);
        state.setScale(0.15);
        state.setPosition({ x: gameConfig.GAME.VIEWWIDTH / 4, y: gameConfig.GAME.VIEWHEIGHT / 2 });
    }

    function update(time) {
        let rotationSpeed = state.velocity.getLength();
        if (state.velocity.y < 0) {
            rotationSpeed *= -1;
        }
        state.setRotation(rotationSpeed * 50);
        return time;
    }

    const localState = {
        __constructor,
        update,
    };

    return createState('Seed', state, {
        localState,
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        hasAudio: hasAudio(state),
        canEmit: canEmit(state),
        hasPhysicsBody: hasPhysicsBody(state),
        hasSprite: hasSprite(state),
        hasLifetime: hasLifetime(state),
        hasCollider: hasCollider(state, gameConfig.COLLIDERS.PLAYER),
    });
};

export default createSeed;
