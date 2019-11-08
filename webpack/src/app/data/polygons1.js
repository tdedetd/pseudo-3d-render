import { Polygon } from '../geometry/shapes';

export const polygons = [
  new Polygon([
    { x: 75, y: 70 },
    { x: 475, y: 70 },
    { x: 475, y: 100 },
    { x: 105, y: 100 },
    { x: 105, y: 300 },
    { x: 135, y: 300 },
    { x: 135, y: 330 },
    { x: 75, y: 330 }
  ]),
  new Polygon([
    { x: 155, y: 150 },
    { x: 205, y: 150 },
    { x: 205, y: 200 },
    { x: 155, y: 200 }
  ]),
  new Polygon([
    { x: 445, y: 180 },
    { x: 475, y: 180 },
    { x: 475, y: 250 },
    { x: 445, y: 250 }
  ])
];
