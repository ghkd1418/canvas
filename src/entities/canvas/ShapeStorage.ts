import { BaseStorage } from '@/shared/utils/baseStorage';
import type { SHAPE_TYPE } from './types';

interface ShapeData {
	type: SHAPE_TYPE;
	props: any;
}

const KEY = 'SHAPE_STORAGE';

export class ShapeStorage extends BaseStorage<ShapeData[]> {
	constructor() {
		super(KEY);
	}

	addShape(shape: ShapeData) {
		const shapes = this.getData() || [];
		shapes.push(shape);
		this.setData(shapes);
	}

	removeShape(shapeToRemove: ShapeData) {
		const shapes = this.getData() || [];
		const updatedShapes = shapes.filter(
			(shape) =>
				shape.type !== shapeToRemove.type ||
				shape.props.id !== shapeToRemove.props.id,
		);

		this.setData(updatedShapes);
	}

	clearShapes() {
		this.deleteData();
	}
}
/***
 * 
 * 
 * lineCap
: 
"round"
lineJoin
: 
"round"
points
: 
(4) [211.8828125, 227.6953125, 211.8828125, 227.6953125]
stroke
: 
"#000000"
strokeWidth
: 
5
 */
