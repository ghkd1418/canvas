import type { Canvas } from './Canvas';

export class Snapshot {
	private canvas: Canvas;

	constructor(canvas: Canvas) {
		this.canvas = canvas;
	}

	resotre(): Canvas {
		return this.canvas;
	}
}
