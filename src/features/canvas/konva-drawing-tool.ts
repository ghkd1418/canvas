import Konva from 'konva';

import { SHAPE_TYPE } from '../../entities/canvas/types';

import type { DrawingTool, Shape } from '../../entities/canvas/types';
import type { RectConfig } from 'konva/lib/shapes/Rect';
import type { ShapeConfig } from 'konva/lib/Shape';

import type { CircleConfig } from 'konva/lib/shapes/Circle';
import type { LineConfig } from 'konva/lib/shapes/Line';
import type { RegularPolygonConfig } from 'konva/lib/shapes/RegularPolygon';

export class KonvaShape implements Shape {
	private shape: Konva.Shape;

	constructor(shape: Konva.Shape) {
		this.shape = shape;
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

export class KonvaDrawingTool implements DrawingTool {
	private stage: Konva.Stage;
	private layer: Konva.Layer;

	constructor(container: string | HTMLDivElement) {
		this.stage = new Konva.Stage({
			container: container,
			width: window.innerWidth * 0.8,
			height: window.innerHeight * 0.8,
		});
		this.layer = new Konva.Layer();
	}

	createShape(type: SHAPE_TYPE, props: ShapeConfig): KonvaShape {
		let shape: Konva.Shape;

		switch (type) {
			case SHAPE_TYPE.RECT:
				shape = new Konva.Rect(props as RectConfig);
				break;
			case SHAPE_TYPE.CIRCLE:
				shape = new Konva.Circle(props as CircleConfig);
				break;
			case SHAPE_TYPE.LINE:
				shape = new Konva.Line(props as LineConfig);
				break;
			case SHAPE_TYPE.CURVE:
				shape = new Konva.Line(props as LineConfig);
				break;
			case SHAPE_TYPE.POLYGON:
				shape = new Konva.RegularPolygon(props as RegularPolygonConfig);
				break;
			default:
				console.warn('지원하지 않는 타입입니다.', type);
				throw new Error(`Unsupported shape type: ${type}`);
		}

		return new KonvaShape(shape);
	}

	addShape(shape: Shape) {
		if (shape instanceof KonvaShape) {
			this.layer.add((shape as any).shape);
			this.stage.add(this.layer);
		}
	}

	removeShape(shape: Shape) {
		if (shape instanceof KonvaShape) {
			(shape as any).shape.remove();
		}
	}

	clear() {
		this.layer.destroyChildren();
		this.layer.draw();
	}
}
