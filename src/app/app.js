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

function getMouseCoords(canvas, event) {
  const canvasRect = canvas.getBoundingClientRect();
  const x = event.pageX - canvasRect.left;
  const y = event.pageY - canvasRect.top - window.scrollY;
  return { x, y };
}

function initUi(field, canvas, mainShapeCanvas, minimapShapeCanvas) {
  const raysCountSpan = document.getElementById('rays-count-span');
  const distanceRangeSpan = document.getElementById('distance-range-span');
  const viewSpan = document.getElementById('view-span');
  const angleSpan = document.getElementById('angle-span');

  canvas.addEventListener('mousemove', event => {
    const mouseCoords = getMouseCoords(canvas, event);
    field.player = mouseCoords;

    field.draw(mainShapeCanvas);
    field.drawMinimap(minimapShapeCanvas);
  });

  raysCountSpan.innerText = field.raysCount;
  document.getElementById('rays-range').addEventListener('input', event => {
    field.raysCount = Number.parseInt(event.target.value);
    raysCountSpan.innerText = event.target.value;

    field.draw(mainShapeCanvas);
    field.drawMinimap(minimapShapeCanvas);
  });

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
}
