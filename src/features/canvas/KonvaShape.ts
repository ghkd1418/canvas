import type { Shape } from '@/entities/canvas/types';
import Konva from 'konva';

export class KonvaShape implements Shape {
	private shape: Konva.Shape;
	private id: string;

	constructor(shape: Konva.Shape) {
		this.shape = shape;
		this.id = this.generateId();
	}

	private generateId(): string {
		return 'shape-' + Math.random().toString(36).substring(2, 9);
	}

	draw() {
		if (this.shape.getLayer()) {
			const layer = this.shape.getLayer()!;

			layer.add(this.shape);
			layer.draw();
		}
	}

	move(x: number, y: number) {
		this.shape.move({ x, y });
	}

	points(points?: number[]): number[] | this {
		if (this.shape instanceof Konva.Line) {
			if (points === undefined) {
				return this.shape.points();
			}
			this.shape.points(points);
			return this;
		}
		throw new Error('This shape does not support points method');
	}
}
