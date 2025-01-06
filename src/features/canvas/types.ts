import type { ShapeType } from '@/entities/canvas/types';
import type Konva from 'konva';

export interface ShapeProps {
	type: ShapeType;
	config: Konva.ShapeConfig;
}
