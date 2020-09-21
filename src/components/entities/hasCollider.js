import eventConfig from 'configs/eventConfig';
import gameConfig from 'configs/gameConfig';
import store from 'root/store';

const hasCollider = function hasColliderFunc(state, colliderType) {
    function __constructor() {
        store.colliders.push(state);
    }

    function update(time) {
        if (colliderType === gameConfig.COLLIDERS.PLAYER) {
            const otherColliders = store.colliders.filter(c => c.colliderType !== state.colliderType);
            const radius = (state.getSprite().height / 2) * state.getScaleY();
            const position = state.getPosition();
            otherColliders.every((collider) => {
                const colliderRadius = (collider.getSprite().height / 2) * collider.getScaleY();
                const colliderPosition = collider.getPosition();
                if (position.dist(colliderPosition) < colliderRadius + radius) {
                    state.emitGlobal(eventConfig.COLLISION);
                    return false;
                }
                return true;
            });
        }
        return time;
    }

    function destroy() {
        store.colliders.splice(store.colliders.indexOf(state), 1);
    }

    return {
        // props
        colliderType,
        // methods
        __constructor,
        update,
        destroy,
    };
};

export default hasCollider;
