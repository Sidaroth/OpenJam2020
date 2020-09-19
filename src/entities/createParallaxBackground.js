import gameConfig from 'configs/gameConfig';
import spriteConfig from 'configs/spriteConfig';
import createState from 'utils/createState';
import Phaser from 'phaser';
import isGameEntity from 'components/entities/isGameEntity';
import getRandomInt from 'utils/math/getRandomInt';
import store from 'root/store';

const createParallaxBackground = function createParallaxBackgroundFunc(parentScene) {
    const state = {};
    const tileSize = 64;

    const TILES = {
        0: spriteConfig.BACKGROUND_TILE_1.KEY,
        1: spriteConfig.BACKGROUND_TILE_2.KEY,
    };

    /**
     * @type {Array<Array<Phaser.GameObjects.Sprite>>}
     */
    const tiles = [];

    function __constructor() {
        const yCount = parseInt(gameConfig.GAME.VIEWHEIGHT / tileSize + 1);
        const xCount = parseInt(gameConfig.GAME.VIEWWIDTH / tileSize + 3);
        for (let i = 0; i < yCount; i += 1) {
            if (!tiles[i]) tiles[i] = [];
            for (let j = 0; j < xCount; j += 1) {
                const sprite = new Phaser.GameObjects.Sprite(
                    parentScene.scene,
                    j * tileSize + tileSize / 2,
                    i * tileSize + tileSize / 2,
                    TILES[getRandomInt(0, 1)],
                );
                tiles[i].push(sprite);
                parentScene.scene.add.existing(sprite);
            }
        }
    }

    function update(time) {
        tiles.forEach((tileRow) => {
            tileRow.forEach((tile, index) => {
                if (tile.x < -(tileSize / 2)) {
                    const rightMostTile = tileRow.reduce((lastTile, t) => {
                        if (!lastTile) {
                            return t;
                        }
                        if (lastTile.x < t.x) {
                            return t;
                        }
                        return lastTile;
                    }, null);
                    tile.setPosition(rightMostTile.x + tileSize, tile.y);
                }
                tile.setPosition(tile.x - store.speed * time.delta, tile.y);
            });
        });

        return time;
    }

    // functions and properties listed here will be public.
    const localState = {
        // props
        // methods
        __constructor,
        update,
    };

    return createState('ParallaxBackground', state, {
        localState,
        isGameEntity: isGameEntity(state),
    });
};

export default createParallaxBackground;
