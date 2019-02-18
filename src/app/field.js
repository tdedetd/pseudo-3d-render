import { checkIntersection } from 'line-intersect';
import { polarToCartesian, getDistance } from './geometry/coordinate-systems';

export class Field {
  // TODO: detach game logic from rendering into game.js or logic.js
  constructor(width, height, polygons) {
    // Logic
    // TODO: add canvas size vars
    this.width = width;
    this.height = height;
    this.polygons = polygons;
    this.player = { x: width / 2, y: height / 2 };
    this.playerRotation = 0;

    // Graphics
    this.fieldOfView = 90;
    this.viewDistance = 300;

    this.raysCount = 600;
    this.needDrawRays = false;
    this.edges = [];

    this._calcEdges();
  }

  draw(shapeCanvas) {
    shapeCanvas.clear();

    this._drawWalls(shapeCanvas);
    this._drawCoords(shapeCanvas);
  }

  drawMinimap(shapeCanvas) {
    shapeCanvas.clear();

    this._drawVision(shapeCanvas);
    this._drawPolygons(shapeCanvas);
    this._drawPlayer(shapeCanvas);
  }

  _calcEdges() {
    for (let polygon of this.polygons) {
      this.edges.push(...polygon.getEdges());
    }
  }

  _drawCoords(shapeCanvas) {
    shapeCanvas.context.fillText(`${this.player.x}, ${this.player.y}`, 0, 400);
  }

  _drawPlayer(shapeCanvas) {
    shapeCanvas.fillCircle(this.player.x, this.player.y, 'yellow');
  }

  _drawPolygons(shapeCanvas) {
    shapeCanvas.context.fillStyle = '#555555';

    this.polygons.forEach(polygon => {
      shapeCanvas.fillPolygon(polygon.points);
    });
  }

  _drawRays(shapeCanvas, rays) {
    rays.forEach(ray => {
      shapeCanvas.strokeLine(ray[0].x, ray[0].y, ray[1].x, ray[1].y, 'white');
    });
  }

  _drawWalls(shapeCanvas) {
    const rays = this._getRays(this.raysCount, this.viewDistance);
    const visionPolygon = this._getClosestIntersectionPoints(rays);
    const distancesToClosestBarriers =
      visionPolygon.map(point => getDistance(this.player, point));

    // TODO: remove fish eye effect (angles needed)
    const halfHeight = this.height / 2;
    let length, color, koef;

    distancesToClosestBarriers.forEach((pointDistance, x) => {
      koef = pointDistance / this.viewDistance;
      color = 255 - 255 * koef;
      length = this.height - this.height * koef;

      shapeCanvas.strokeLine(x, halfHeight - length / 2, x, length, `rgba(0, 0, ${color})`);
    });
  }

  _drawVision(shapeCanvas) {
    const rays = this._getRays(this.raysCount, this.viewDistance);
    let visionPolygon = this._getClosestIntersectionPoints(rays);

    if (this.fieldOfView < 360) {
      visionPolygon.push(this.player);
    }

    shapeCanvas.context.fillStyle = 'rgba(128, 128, 256, 0.4)';
    shapeCanvas.fillPolygon(visionPolygon);

    if (this.needDrawRays) {
      this._drawRays(shapeCanvas, rays);
    }
  }

  _getClosestIntersectionPoint(ray) {
    let intersection;
    let points = [];

    this.edges.forEach(edge => {
      intersection = checkIntersection(ray[0].x, ray[0].y, ray[1].x, ray[1].y,
                                       edge[0].x, edge[0].y, edge[1].x, edge[1].y);

      if (intersection.type === 'intersecting') {
        points.push(intersection.point);
      }
    });

    points.push(ray[1]);

    let closestPoint = points.sort(
      (point1, point2) => getDistance(this.player, point1) -
                          getDistance(this.player, point2)
    )[0];

    return closestPoint;
  }

  _getClosestIntersectionPoints(rays) {
    let closestPoints = [];

    rays.forEach(ray => {
      closestPoints.push(this._getClosestIntersectionPoint(ray));
    });
    return closestPoints;
  }

  /**
   * Generates specified number of rays relative to player position
   * @param {number} count 
   * @param {number} radius 
   */
  _getRays(count, radius) {
    const angleDiff = this.fieldOfView / count;
    const selfFieldOfView = this.fieldOfView / 2;
    const angleFrom = this.playerRotation - selfFieldOfView;
    const angleTo = this.playerRotation + selfFieldOfView;

    let rays = [];
    let currentCoords;

    for (let angle = angleFrom; angle < angleTo; angle += angleDiff) {
      currentCoords = polarToCartesian(angle, radius, this.player);

      const ray = [this.player, currentCoords];
      rays.push(ray);
    }

    return rays;
  }
}
