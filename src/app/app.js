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

  const ranges = [
    {
      spanId: 'distance-span',
      rangeId: 'distance-range',
      getVal: () => field.viewDistance,
      setVal: val => field.viewDistance = val
    },
    {
      spanId: 'view-span',
      rangeId: 'view-range',
      getVal: () => field.fieldOfView,
      setVal: val => field.fieldOfView = val
    },
    {
      spanId: 'angle-span',
      rangeId: 'angle-range',
      getVal: () => field.playerRotation,
      setVal: val => field.playerRotation = val
    },
    {
      spanId: 'x-span',
      rangeId: 'x-range',
      getVal: () => field.player.x,
      setVal: val => field.player.x = val
    },
    {
      spanId: 'y-span',
      rangeId: 'y-range',
      getVal: () => field.player.y,
      setVal: val => field.player.y = val
    }
  ];

  ranges.forEach(range => initRange(range.spanId, range.rangeId, field,
    mainShapeCanvas, minimapShapeCanvas, range.getVal, range.setVal));
}

/**
 * Inits specified range DOM element
 * @param {string} spanId id of DOM span element
 * @param {string} rangeId id of DOM range element
 * @param {object} field instance of Field
 * @param {object} shapeCanvas 
 * @param {object} minimapShapeCanvas 
 * @param {function} getVal logic defines getting value of field object
 * @param {function} setVal logic defines setting value of field object
 */
function initRange(spanId, rangeId, field, shapeCanvas, minimapShapeCanvas, getVal, setVal) {
  const spanEl = document.getElementById(spanId);
  const rangeEl = document.getElementById(rangeId);

  spanEl.innerText = getVal();

  rangeEl.addEventListener('input', event => {
    setVal(Number.parseInt(event.target.value));
    spanEl.innerText = event.target.value;

    field.draw(shapeCanvas);
    field.drawMinimap(minimapShapeCanvas);
  });
}
