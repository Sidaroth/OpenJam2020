// From https://easings.net/#easeInOutQuart

const easeInOutQuart = function easeInOutQuartFunc(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - (-2 * x + 2) ** 4 / 2;
};

export default easeInOutQuart;

