import isGameEntity from 'components/entities/isGameEntity';
import canEmit from 'components/events/canEmit';
import hasPosition from 'components/hasPosition';
import createState from 'utils/createState';
import hasAudio from 'components/hasAudio';
import hasPhysicsBody from 'components/hasPhysicsBody';
import hasSprite from 'components/entities/hasSprite';

const createSeed = function createPlayerFunc() {
    const state = {};

    function __constructor() {
    }

    const localState = {
        __constructor,
    };

    return createState('Player', state, {
        localState,
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        hasAudio: hasAudio(state),
        canEmit: canEmit(state),
        hasPhysicsBody: hasPhysicsBody(state),
        hasSprite: hasSprite(state),
    });
};

export default createSeed;
