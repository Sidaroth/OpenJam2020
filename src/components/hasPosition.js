import Vector from 'utils/math/Vector';

const hasPosition = function hasPositionFunc(state) {
    const pos = new Vector();

    function setPosition({ x: xp, y: yp }) {
        pos.x = xp;
        pos.y = yp;
        return pos.clone();
    }

    function setX(xp) {
        state.setPosition(new Vector(xp, pos.y));
        return xp;
    }

    function setY(yp) {
        state.setPosition(new Vector(pos.x, yp));
        return yp;
    }

    function getPosition() {
        return pos.clone();
    }

    function getX() {
        return pos.x;
    }

    function getY() {
        return pos.y;
    }

    return {
        // props
        // methods
        setPosition,
        setX,
        setY,
        getPosition,
        getX,
        getY,
    };
};

export default hasPosition;
