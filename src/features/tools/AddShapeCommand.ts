import type { Canvas } from '../../entities/canvas/Canvas';
import { Command } from '../canvas/Command';
import type { ShapeProps } from '../canvas/types';

export class AddShapeCommand extends Command {
	constructor(
		canvas: Canvas,
		private shapeProps: ShapeProps,
	) {
		super(canvas);
	}

	execute(): void {
		this.makeBackup();
		this.canvas.addShape(this.shapeProps);
	}

	undo(): void {
		if (this.shapeProps) {
			this.canvas.removeShape(this.shapeProps);
		}
	}
}
