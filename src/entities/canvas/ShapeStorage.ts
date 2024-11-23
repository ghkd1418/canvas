import { BaseStorage } from '@/shared/utils/baseStorage';
import type { SHAPE_TYPE } from './types';

interface ShapeData {
	id: string;
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

	removeShape(shapeToRemoveId: ShapeData['id']) {
		const shapes = this.getData() || [];

		const updatedShapes = shapes.filter(
			(shape) => shape.id !== shapeToRemoveId,
		);

		this.setData(updatedShapes);
	}

	clearShapes() {
		this.deleteData();
	}
}
