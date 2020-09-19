import gameConfig from 'configs/gameConfig';
import Vector from 'utils/math/Vector';

const hasPhysicsBody = function hasPhysicsBodyFunc(state) {
    function setMass(mass) {
        state.mass = mass;
    }

    function setDrag(drag) {
        state.dragCoeff = drag;
    }

    function calculateDrag(fluidDensity) {
        const speed = state.velocity.getLength();
        const dragMagnitude = fluidDensity * state.dragCoeff * speed * speed;
        const drag = Vector.multiply(state.velocity, -1).getUnit();
        drag.multiply(dragMagnitude);

        state.acceleration.add(drag);
    }

    function update(time) {
        state.setPosition(state.getPosition().add(Vector.multiply(state.velocity, time.delta)));
        state.velocity.add(state.acceleration);

        state.velocity.limit(gameConfig.MAX_SEED_VELOCITY);

        // because force application is additive each frame, we have to zero inbetween updates.
        state.acceleration.zero();
        return time;
    }

    function applyForce(force) {
        if (!force) return;

        state.acceleration.add(Vector.divide(force, state.mass));
    }

    function destroy() {
    }

    return {
        // props
        mass: 20,
        velocity: new Vector(),
        acceleration: new Vector(),
        degCoeff: 0.1,
        // methods
        setMass,
        setDrag,
        calculateDrag,
        update,
        applyForce,
        destroy,
    };
};

export default hasPhysicsBody;
