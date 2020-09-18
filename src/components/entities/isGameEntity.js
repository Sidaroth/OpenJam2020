import getUUID from 'utils/getUUID';

const isGameEntity = function isGameEntityFunc(state) {
    function update() {}

    return {
        // props
        id: getUUID(),
        // methods
        update,
    };
};

export default isGameEntity;
