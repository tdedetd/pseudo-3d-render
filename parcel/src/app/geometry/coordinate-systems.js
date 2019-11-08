/**
 * Converts polar coordinate system to cartesian
 * @param {number} angle in degree
 * @param {number} radius 
 * @param {object} origin object of { x: number, y: number }
 */
export function polarToCartesian(angle, radius, origin) {
  if (typeof origin === 'undefined') {
    origin = { x: 0, y: 0 };
  }

  const radians = angle * Math.PI / 180;
  const x = radius * Math.cos(radians) + origin.x;
  const y = radius * Math.sin(radians) + origin.y;

  return { x, y };
}

export function getDistance(point1, point2) {
  // Pythagorean theorem
  return Math.sqrt(Math.pow(point1.x - point2.x, 2) +
    Math.pow(point1.y - point2.y, 2));
}
