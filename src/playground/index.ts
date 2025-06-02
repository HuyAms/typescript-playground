type Coord = [x: number, y: number];
interface Box {
  type: 'box';
  topLeft: Coord;
  size: Coord;
}
interface Circle {
  type: 'circle';
  center: Coord;
  radius: number;
}
interface Line {
  type: 'line';
  start: Coord;
  end: Coord;
}
type Shape = Box | Circle | Line;

function assertUnreachable(value: never): never {
  throw new Error(`Missed a case! ${value}`);
}

function drawShape(shape: Shape, context: CanvasRenderingContext2D) {
  switch (shape.type) {
    case 'box':
      context.rect(...shape.topLeft, ...shape.size);
      break;
    case 'circle':
      context.arc(...shape.center, shape.radius, 0, 2 * Math.PI);
      break;
    case 'line':
      context.arc(...shape.center, shape.radius, 0, 2 * Math.PI);
      break;
    default:
      shape satisfies never;
  }
}
