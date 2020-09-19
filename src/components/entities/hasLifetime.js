
const hasLifetime = function hasLifetimeFunc(state) {
    let spawnTime;
    let lifetime = 0;

    function __constructor() {
        spawnTime = Date.now();
    }

    function update(time) {
        lifetime += time.delta;
        return time;
    }

    function getSpawnTime() {
        return spawnTime;
    }

    function getLifetime() {
        return lifetime;
    }

    return {
        // props
        // methods
        __constructor,
        update,
        getSpawnTime,
        getLifetime,
    };
};

export default hasLifetime;
