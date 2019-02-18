import { Field } from './field';
import { ShapeCanvas } from './shape-canvas';
import { polygons } from './data/polygons1';

export function init() {
  let mainCanvas = document.getElementById('main-canvas');
  let mainShapeCanvas = new ShapeCanvas(mainCanvas);

  let minimapCanvas = document.getElementById('minimap-canvas');
  let minimapShapeCanvas = new ShapeCanvas(minimapCanvas);

  let field = new Field(mainCanvas.width, mainCanvas.height, polygons);

  initUi(field, mainCanvas, mainShapeCanvas, minimapShapeCanvas);
  field.draw(mainShapeCanvas);
  field.drawMinimap(minimapShapeCanvas);
}

function initUi(field, canvas, mainShapeCanvas, minimapShapeCanvas) {
  const distanceRangeSpan = document.getElementById('distance-range-span');
  const viewSpan = document.getElementById('view-span');
  const angleSpan = document.getElementById('angle-span');
  const xSpan = document.getElementById('x-span');
  const ySpan = document.getElementById('y-span');

  distanceRangeSpan.innerText = field.viewDistance;
  document.getElementById('distance-range').addEventListener('input', event => {
    field.viewDistance = Number.parseInt(event.target.value);
    distanceRangeSpan.innerText = event.target.value;

    field.draw(mainShapeCanvas);
    field.drawMinimap(minimapShapeCanvas);
  });

  viewSpan.innerText = field.fieldOfView;
  document.getElementById('view-range').addEventListener('input', event => {
    field.fieldOfView = Number.parseInt(event.target.value);
    viewSpan.innerText = event.target.value;

    field.draw(mainShapeCanvas);
    field.drawMinimap(minimapShapeCanvas);
  });

  angleSpan.innerText = field.playerRotation;
  document.getElementById('angle-range').addEventListener('input', event => {
    field.playerRotation = Number.parseInt(event.target.value);
    angleSpan.innerText = event.target.value;

    field.draw(mainShapeCanvas);
    field.drawMinimap(minimapShapeCanvas);
  });

  xSpan.innerText = field.player.x;
  document.getElementById('x-range').addEventListener('input', event => {
    field.player.x = Number.parseInt(event.target.value);
    xSpan.innerText = event.target.value;

    field.draw(mainShapeCanvas);
    field.drawMinimap(minimapShapeCanvas);
  });

  ySpan.innerText = field.player.y;
  document.getElementById('y-range').addEventListener('input', event => {
    field.player.y = Number.parseInt(event.target.value);
    ySpan.innerText = event.target.value;

    field.draw(mainShapeCanvas);
    field.drawMinimap(minimapShapeCanvas);
  });
}
