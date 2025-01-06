import type { ShapeProps } from '@/features/canvas/types';
import type { ShapeConfig } from 'konva/lib/Shape';

export interface Shape {
	draw(): void;
	move(x: number, y: number): void;
}

export interface DrawingTool {
	createShape(type: string, props: ShapeConfig): Shape;
	addShapeToCanvas(shape: Shape, saveToStorage: boolean): void;
	removeShapeToCanvas(shape: Shape): void;
	clearToCanvas(): void;
}

export interface ShapeData extends ShapeProps {
	id: string;
}

export const SHAPE_TYPE = {
	RECTANGLE: 'rectangle',
	CIRCLE: 'circle',
	REGULAR_POLYGON: 'regularpolygon',
	LINE: 'line',
	CURVE: 'curve',
} as const;

export type ShapeType = (typeof SHAPE_TYPE)[keyof typeof SHAPE_TYPE];

export interface Memento {
	stageState: string;
}
