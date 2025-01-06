import { ShapeFactory } from '@/entities/canvas/ShapeFactory';
import type Konva from 'konva';
import type { Layer } from 'konva/lib/Layer';

import type { ShapeProps } from '../canvas/types';

export class ShapeManager {
	private shapeRegistry: Map<string, Konva.Shape> = new Map();
	private layer: Layer;

	constructor(layer: Layer) {
		this.layer = layer;
	}

	addShape(shapeProps: ShapeProps): void {
		const shape = ShapeFactory.createShape(shapeProps);

		this.shapeRegistry.set(shape.id(), shape);
		this.layer.add(shape);
		this.layer.draw();
	}

	removeShape(shapeProps: ShapeProps): void {
		if (shapeProps.config.id) {
			const shape = this.shapeRegistry.get(shapeProps.config.id);

			if (shape) {
				shape.remove();
				this.shapeRegistry.delete(shapeProps.config.id);
			}
			this.layer.draw();
		}
	}
}
