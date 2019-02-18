export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Polygon {
  constructor(points) {
    this.points = points;
  }

  getEdges() {
    let lines = [];
    const pointsCount = this.points.length;

    for (let firstPointNdx = 0; firstPointNdx < pointsCount; firstPointNdx++) {

      const secondPointNdx = (firstPointNdx + 1) % pointsCount;
      lines.push([this.points[firstPointNdx], this.points[secondPointNdx]]);
    }

    return lines;
  }
}
