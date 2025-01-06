import type { Canvas } from '@/entities/canvas/Canvas';
import type { Snapshot } from '@/entities/canvas/Snapshot';

export abstract class Command {
	protected canvas: Canvas;
	private backup: Snapshot | null = null;

	constructor(canvas: Canvas) {
		this.canvas = canvas;
	}

	makeBackup(): void {
		this.backup = this.canvas.createSnapshot();
	}

	restore(): void {
		if (this.backup) {
			this.canvas.restore(this.backup);
		}
	}

	redo(): void {
		this.execute();
	}

	abstract undo(): void;

	abstract execute(): void;
}
