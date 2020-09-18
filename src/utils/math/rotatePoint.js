/**
 * Rotates a point by a given radian. A pivot may be specified.
 */
export default function rotatePoint(point, radians, pivot = { x: 0, y: 0 }) {
    const res = { x: 0, y: 0 };
    res.x = ((point.x - pivot.x) * Math.cos(radians)) - ((point.y - pivot.y) * Math.sin(radians)) + pivot.x;
    res.y = ((point.x - pivot.x) * Math.sin(radians)) + ((point.y - pivot.y) * Math.cos(radians)) + pivot.y;

    return res;
}
