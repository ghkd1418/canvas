import Konva from 'konva';

import type { Shape } from '@/entities/canvas/types';

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

	getId() {
		return this.id;
	}

	getKonvaShape() {
		return this.shape;
	}

	draw() {
		if (this.shape.getLayer()) {
			this.shape.getLayer()!.add(this.shape);
			this.shape.getLayer()!.draw();
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
