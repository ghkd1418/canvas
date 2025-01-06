import type { ShapeProps } from '@/features/canvas/types';
import Konva from 'konva';
import { v4 as uuidv4 } from 'uuid';

export class ShapeFactory {
	static createShape(props: ShapeProps): Konva.Shape {
		if (!props.config.id) {
			props.config.id = uuidv4();
		}

		switch (props.type) {
			case 'rectangle':
				return new Konva.Rect(props.config);
			case 'circle':
				return new Konva.Circle(props.config);

			default:
				throw new Error(`Unknown shape type: ${props.type}`);
		}
	}
}
