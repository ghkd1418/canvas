import type { ShapeConfig } from 'konva/lib/Shape';

export interface Shape {
	draw(): void;
	move(x: number, y: number): void;
}

export interface DrawingTool {
	createShape(type: string, props: ShapeConfig): Shape;
	addShape(shape: Shape): void;
	removeShape(shape: Shape): void;
	clear(): void;
}

export enum SHAPE_TYPE {
	RECT = 'rect',
	CIRCLE = 'circle',
	POLYGON = 'polygon',
	LINE = 'line',
	CURVE = 'curve',
}
