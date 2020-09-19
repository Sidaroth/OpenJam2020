import gameConfig from 'configs/gameConfig';
import createTree from 'entities/createTree';
import store from 'root/store';
import createState from 'utils/createState';
import getRandomInt from 'utils/math/getRandomInt';

const createTreeManager = function createTreeManagerFunc() {
    const state = {};
    let treeClusters = [];
    const DISTANCE_BETWEEN_CLUSTERS = 300;
    let distanceSinceLastCluster = 0;

    function __constructor() {

    }

    function createCluster() {
        const treeCount = getRandomInt(6, 30);
        const originalY = getRandomInt(0, gameConfig.GAME.VIEWHEIGHT);
        let startY = originalY;
        let startX = gameConfig.GAME.VIEWWIDTH + 100;
        let treeHeight = getRandomInt(3, 8);
        let currentTreeHeight = 0;
        let upwards = getRandomInt(0, 1) === 1;
        if (startY < 200) {
            upwards = false;
        } else if (gameConfig.GAME.VIEWWIDTH - startY < 200) {
            upwards = true;
        }
        const cluster = {
            trees: [],
        };
        for (let i = 0; i < treeCount; i += 1) {
            currentTreeHeight += 1;
            const tree = createTree();
            const treeSize = tree.getSprite().height;
            startY += (treeSize / 2) * (upwards ? -1 : 1);
            tree.setPosition({
                x: startX,
                y: startY,
            });
            startY += (treeSize / 2) * (upwards ? -1 : 1);
            if (startY < 0 || startY > gameConfig.GAME.VIEWHEIGHT || currentTreeHeight >= treeHeight) {
                startY = originalY;
                startX += 32;
                currentTreeHeight = 0;
                treeHeight = getRandomInt(3, 8);
            }

            cluster.trees.push(tree);
        }

        treeClusters.push(cluster);
    }

    function cleanupTrees() {
        for (let i = treeClusters.length - 1; i >= 0; i -= 1) {
            const { trees } = treeClusters[i];
            for (let j = trees.length - 1; j >= 0; j -= 1) {
                const tree = trees[j];
                if (tree.getX() < -100) {
                    tree.destroy();
                    trees.splice(j, 1);
                }
            }
            if (trees.length === 0) {
                treeClusters.splice(i, 1);
            }
        }
    }

    function update(time) {
        distanceSinceLastCluster += time.delta * store.speed;
        if (distanceSinceLastCluster > DISTANCE_BETWEEN_CLUSTERS) {
            distanceSinceLastCluster -= DISTANCE_BETWEEN_CLUSTERS;

            createCluster();
        }

        treeClusters.forEach((treeCluster) => {
            treeCluster.trees.forEach((tree) => {
                tree.update(time);
            });
        });

        cleanupTrees();

        return time;
    }

    function destroy() {
        treeClusters.forEach((treeCluster) => {
            treeCluster.trees.forEach((tree) => {
                tree.destroy();
            });
            treeCluster.trees = [];
        });
        treeClusters = [];
    }

    const localState = {
        // props

        // methods
        __constructor,
        update,
        destroy,
    };

    return createState('TreeManager', state, {
        localState,
    });
};

export default createTreeManager;
