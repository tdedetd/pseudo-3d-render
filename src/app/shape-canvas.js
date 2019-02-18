export class ShapeCanvas {
  constructor(canvas) {
    this.context = canvas.getContext('2d');
    this._canvas = canvas;
  }

  /** Clears canvas */
  clear() {
    const canvas = this._canvas;
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Fiils an ellipse with radius = 2
   * @param {number} x 
   * @param {number} y 
   * @param {string} fillStyle 
   */
  fillCircle(x, y, fillStyle) {
    let ctx = this.context;

    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.ellipse(x, y, 4, 4, 0, 0, 2 * Math.PI);

    ctx.fill();
  }

  fillPolygon(points) {
    this._drawPolygon(true, points);
  }

  /**
   * Draws a black line with length = 2
   * @param {number} x1 
   * @param {number} y1 
   * @param {number} x2 
   * @param {number} y2 
   * @param {string} strokeStyle 
   */
  strokeLine(x1, y1, x2, y2, strokeStyle) {
    let ctx = this.context;

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  strokePolygon(points) {
    this._drawPolygon(false, points);
  }

  /**
   * Draws a polygon by given points.
   * @param {boolean} needFill 
   * @param {Array} points 
   */
  _drawPolygon(needFill, points) {

    let ctx = this.context;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    points.slice(1).forEach(point => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.closePath();

    if (needFill) {
      ctx.fill();
    }
  }
}
