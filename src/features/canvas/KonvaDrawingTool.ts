import { ShapeStorage } from '@/entities/canvas/ShapeStorage';
import Konva from 'konva';
import type { ShapeConfig } from 'konva/lib/Shape';
import type { CircleConfig } from 'konva/lib/shapes/Circle';
import type { LineConfig } from 'konva/lib/shapes/Line';
import type { RectConfig } from 'konva/lib/shapes/Rect';
import type { RegularPolygonConfig } from 'konva/lib/shapes/RegularPolygon';

import { SHAPE_TYPE } from '../../entities/canvas/types';
import type { DrawingTool, Shape } from '../../entities/canvas/types';
import { KonvaShape } from './KonvaShape';

export class KonvaDrawingTool implements DrawingTool {
	private stage: Konva.Stage;
	private layer: Konva.Layer;
	private shapeStorage: ShapeStorage;

	constructor(container: string | HTMLDivElement) {
		this.stage = new Konva.Stage({
			container: container,
			width: window.innerWidth * 0.8,
			height: window.innerHeight * 0.8,
		});
		this.layer = new Konva.Layer();
		this.shapeStorage = new ShapeStorage();

		// 스토리지에서 도형 복원
		this.restoreShapes();
	}

	private restoreShapes() {
		const savedShapes = this.shapeStorage.getData();

		if (savedShapes) {
			savedShapes.forEach(({ type, props }) => {
				const normalizedType = type.toLowerCase() as SHAPE_TYPE;
				this.createAndAddShape(normalizedType, props);
			});
		}
	}

	private createAndAddShape(type: SHAPE_TYPE, props: ShapeConfig) {
		try {
			const shape = this.createShape(type, props);
			this.layer.add(shape.getKonvaShape());
			this.stage.add(this.layer);
		} catch (error) {
			console.warn('도형 생성 중 오류 발생:', error);
		}
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
			case SHAPE_TYPE.LINE || SHAPE_TYPE.CURVE:
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

	addShapeToCanvas(shape: Shape, saveToStorage = true) {
		if (shape instanceof KonvaShape) {
			this.layer.add(shape.getKonvaShape());

			if (saveToStorage) {
				this.saveShapeToStorage(shape);
			}

			this.stage.add(this.layer);
		}
	}

	removeShapeToCanvas(shape: Shape) {
		if (shape instanceof KonvaShape) {
			shape.getKonvaShape().remove();

			// 로컬스토리지에 도형 제거
			this.shapeStorage.removeShape(shape.getId());
		}
	}

	clearToCanvas() {
		this.layer.destroyChildren();
		this.shapeStorage.clearShapes();

		this.layer.draw();
	}

	private saveShapeToStorage(shape: Shape) {
		if (shape instanceof KonvaShape) {
			this.shapeStorage.saveShape({
				id: shape.getId(),
				type: shape.getKonvaShape().getClassName() as SHAPE_TYPE,
				props: shape.getKonvaShape().getAttrs(),
			});
		}
	}
}
