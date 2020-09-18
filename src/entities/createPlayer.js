import isGameEntity from 'components/entities/isGameEntity';
import canEmit from 'components/events/canEmit';
import hasPosition from 'components/hasPosition';
import createState from 'utils/createState';
import hasAudio from 'components/hasAudio';
import hasPhysicsBody from 'components/hasPhysicsBody';

const createPlayer = function createPlayerFunc() {
    // variables and functions here are private unless listed below in localState.
    const state = {};

    function __constructor() {
    }

    // functions and properties listed here will be public.
    const localState = {
        // props
        name: 'Player name',
        // methods
        __constructor,
    };

    // These are the substates, or components, that describe the functionality of the resulting object.
    return createState('Player', state, {
        localState,
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        hasAudio: hasAudio(state),
        canEmit: canEmit(state),
        hasPhysicsBody: hasPhysicsBody(state),
    });
};

export default createPlayer;
