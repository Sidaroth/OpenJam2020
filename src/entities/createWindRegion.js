import hasPosition from 'components/hasPosition';
import hasSize from 'components/hasSize';
import store from 'root/store';
import createState from 'utils/createState';
import Vector from 'utils/math/Vector';
import * as Phaser from 'phaser';
import getRandomInt from 'utils/math/getRandomInt';
import isGameEntity from 'components/entities/isGameEntity';

/**
 * Wind Region that applies a wind force to any susceptible entities wihtin it.
 */
const createWindRegion = function createWindRegionFunc() {
    const state = {};

    let drawWind = true;
    const gfx = new Phaser.GameObjects.Graphics(store.ui.scene);

    const maxWindStrength = 2;
    const windForce = new Vector(0, (getRandomInt(0, maxWindStrength * 100) - maxWindStrength * 50) / 100);

    function __constructor() {
        store.ui.scene.add.existing(gfx);
    }

    function isWithinRegion(entity) {
        const entityPos = entity.getPosition();
        const statePos = state.getPosition();

        return entityPos.x >= statePos.x && entityPos.x < statePos.x + state.getWidth() &&
        entityPos.y >= statePos.y && entityPos.y < statePos.y + state.getHeight();
    }

    function drawWindRegion() {
        const yPadding = 5;

        const topYPos = state.getY() + state.getHeight() / yPadding;
        const bottomYPos = state.getY() + state.getHeight() - (state.getHeight() / yPadding);
        const downForce = windForce.y > 0;

        const startXPos = state.getX() + state.getWidth() / 2;
        const startYPos = downForce ? topYPos : bottomYPos;
        const endYPos = downForce ? bottomYPos : topYPos;
        const arrowYOffset = downForce ? -(state.getHeight() / 5) : state.getHeight() / 5;

        gfx.clear();
        gfx.lineStyle(Math.max(1, windForce.squaredLength() / 5), 0xff0000, 1);
        gfx.beginPath();
        gfx.moveTo(startXPos, startYPos);
        gfx.lineTo(startXPos, endYPos);
        gfx.lineTo(startXPos - state.getWidth() / 10, endYPos + arrowYOffset);
        gfx.moveTo(startXPos, endYPos);
        gfx.lineTo(startXPos + state.getWidth() / 10, endYPos + arrowYOffset);
        gfx.strokePath();
    }

    function update(delta) {
        if (drawWind) drawWindRegion();
        if (isWithinRegion(store.seed)) {
            store.seed.applyForce(windForce);
        }
    }

    function setDrawWind(val) {
        drawWind = val;
    }

    const localState = {
        __constructor,
        update,
        setDrawWind,
    };

    return createState('WindRegion', state, {
        localState,
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        hasSize: hasSize(state),
    });
};

export default createWindRegion;
