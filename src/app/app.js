import { Field } from './field';
import { ShapeCanvas } from './shape-canvas';
import { polygons } from './data/polygons1';

export function init() {
  let canvas = document.getElementsByTagName('canvas')[0];
  let shapeCanvas = new ShapeCanvas(canvas);
  let field = new Field(canvas.width, canvas.height, polygons);

  initUi(field, canvas, shapeCanvas);
  field.draw(shapeCanvas);
}

function getMouseCoords(canvas, event) {
  const canvasRect = canvas.getBoundingClientRect();
  const x = event.pageX - canvasRect.left;
  const y = event.pageY - canvasRect.top - window.scrollY;
  return { x, y };
}

function initUi(field, canvas, shapeCanvas) {
  const raysCountSpan = document.getElementById('rays-count-span');
  const distanceRangeSpan = document.getElementById('distance-range-span');
  const viewSpan = document.getElementById('view-span');
  const angleSpan = document.getElementById('angle-span');

  canvas.addEventListener('mousemove', event => {
    const mouseCoords = getMouseCoords(canvas, event);
    field.player = mouseCoords;
    field.draw(shapeCanvas);
  });

  raysCountSpan.innerText = field.raysCount;
  document.getElementById('rays-range').addEventListener('input', event => {
    field.raysCount = Number.parseInt(event.target.value);
    raysCountSpan.innerText = event.target.value;

    field.draw(shapeCanvas);
  });

  distanceRangeSpan.innerText = field.viewDistance;
  document.getElementById('distance-range').addEventListener('input', event => {
    field.viewDistance = Number.parseInt(event.target.value);
    distanceRangeSpan.innerText = event.target.value;

    field.draw(shapeCanvas);
  });

  viewSpan.innerText = field.fieldOfView;
  document.getElementById('view-range').addEventListener('input', event => {
    field.fieldOfView = Number.parseInt(event.target.value);
    viewSpan.innerText = event.target.value;

    field.draw(shapeCanvas);
  });

  angleSpan.innerText = field.playerRotation;
  document.getElementById('angle-range').addEventListener('input', event => {
    field.playerRotation = Number.parseInt(event.target.value);
    angleSpan.innerText = event.target.value;

    field.draw(shapeCanvas);
  });
}
