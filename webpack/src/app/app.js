import { Field } from './field';
import { ShapeCanvas } from './shape-canvas';
import { ranges } from './data/ranges';

export function init(polygons) {
  let mainCanvas = document.getElementById('main-canvas');
  let mainShapeCanvas = new ShapeCanvas(mainCanvas);

  let minimapCanvas = document.getElementById('minimap-canvas');
  let minimapShapeCanvas = new ShapeCanvas(minimapCanvas);

  let field = new Field(mainCanvas.width, mainCanvas.height, polygons);

  initUi(field, mainShapeCanvas, minimapShapeCanvas);
  field.draw(mainShapeCanvas);
  field.drawMinimap(minimapShapeCanvas);
}

function initUi(field, mainShapeCanvas, minimapShapeCanvas) {

  const uiEl = document.getElementById('adjustments');
  ranges.forEach(range => initRange(range, field, mainShapeCanvas, minimapShapeCanvas, uiEl));
}

/**
 * Inits specified range DOM element
 */
function initRange(range, field, shapeCanvas, minimapShapeCanvas, uiEl) {
  const element = document.createElement('div');
  const titleEl = document.createElement('span');
  const inputEl = document.createElement('input');
  const valueEl = document.createElement('span');

  titleEl.innerText = range.title + ':';
  inputEl.type = 'range';
  inputEl.min = range.min;
  inputEl.max = range.max;
  inputEl.value = field[range.attr];
  valueEl.innerText = field[range.attr];

  element.appendChild(titleEl);
  element.appendChild(inputEl);
  element.appendChild(valueEl);
  uiEl.appendChild(element);

  inputEl.addEventListener('input', event => {
    field[range.attr] = Number.parseInt(event.target.value);
    valueEl.innerText = event.target.value;

    field.draw(shapeCanvas);
    field.drawMinimap(minimapShapeCanvas);
  });
}
