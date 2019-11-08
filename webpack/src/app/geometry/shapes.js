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

    for (let i = 0; i < pointsCount; i++) {
      lines.push([this.points[i],
                  this.points[(i + 1) % pointsCount]]);
    }

    return lines;
  }
}
