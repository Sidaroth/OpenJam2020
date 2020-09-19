import hasPosition from 'components/hasPosition';
import hasSize from 'components/hasSize';
import store from 'root/store';
import createState from 'utils/createState';
import Vector from 'utils/math/Vector';
import * as Phaser from 'phaser';
import getRandomInt from 'utils/math/getRandomInt';
import isGameEntity from 'components/entities/isGameEntity';
import gameConfig from 'configs/gameConfig';

/**
 * Wind Region that applies a wind force to any susceptible entities wihtin it.
 */
const createWindRegion = function createWindRegionFunc() {
    const state = {};

    let drawWind = true;
    const gfx = new Phaser.GameObjects.Graphics(store.ui.scene);

    const maxWindStrength = 0.025;
    const windForce = new Vector(0, maxWindStrength);

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
        gfx.lineStyle(Math.max(2, windForce.getLength() / 5), downForce ? 0x0000ff : 0xff0000, 1);
        gfx.beginPath();
        gfx.moveTo(startXPos, startYPos);
        gfx.lineTo(startXPos, endYPos);
        gfx.lineTo(startXPos - state.getWidth() / 10, endYPos + arrowYOffset);
        gfx.moveTo(startXPos, endYPos);
        gfx.lineTo(startXPos + state.getWidth() / 10, endYPos + arrowYOffset);
        gfx.strokePath();
    }

    /**
     * Moves the region to the "back of the line" for parallaxing.
     */
    function moveToBack() {
        state.setPosition({ x: gameConfig.GAME.VIEWWIDTH, y: state.getY() });
    }

    function setPosition(pos) {
        if (pos.y >= gameConfig.GAME.VIEWHEIGHT / 2) {
            windForce.y = -maxWindStrength;
        } else {
            windForce.y = maxWindStrength;
        }

        return pos;
    }

    function update(time) {
        state.setPosition({
            x: state.getX() - store.speed * time.delta,
            y: state.getY(),
        });

        // We're entirely off the screen, move to back.
        if (state.getX() < -state.getWidth()) state.moveToBack();

        if (drawWind) drawWindRegion();
        if (isWithinRegion(store.seed)) {
            const center = new Vector(state.getWidth() / 2, state.getHeight() / 2);
            const cornerToCenter = new Vector().dist(center);
            const distanceToCenter = store.seed.getPosition().dist(new Vector(state.getX() + state.getWidth() / 2, state.getY() + state.getHeight() / 2));

            const inverseDistance = Math.abs(1 - (distanceToCenter / cornerToCenter));

            // const windForceStrength = windForce.y * inverseDistance;
            // console.log(windForceStrength);
            // windForce.y = windForceStrength;

            store.seed.applyForce(windForce);
        }
        return time;
    }

    function setDrawWind(val) {
        drawWind = val;
    }

    const localState = {
        __constructor,
        moveToBack,
        update,
        setDrawWind,
        setPosition,
    };

    return createState('WindRegion', state, {
        localState,
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        hasSize: hasSize(state),
    });
};

export default createWindRegion;
