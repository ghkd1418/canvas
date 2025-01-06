import type { Layer } from 'konva/lib/Layer';
import type { Stage } from 'konva/lib/Stage';

import type { ShapeProps } from '../../features/canvas/types';
import { ShapeManager } from '../../features/tools/ShapeManager';
import { Snapshot } from './Snapshot';

export interface Originator<T> {
	createSnapshot(): T;
	restore(snapshot: T): void;
}

export class Canvas implements Originator<Snapshot> {
	private stage: Stage;
	private layer: Layer;
	private shapeManager: ShapeManager;

	constructor(stage: Stage, layer: Layer) {
		this.stage = stage;
		this.layer = layer;
		this.shapeManager = new ShapeManager(this.layer);
	}

	addShape(shapeProps: ShapeProps): void {
		this.shapeManager.addShape(shapeProps);
	}

	removeShape(shapeProps: ShapeProps): void {
		this.shapeManager.removeShape(shapeProps);
	}

	createSnapshot(): Snapshot {
		return new Snapshot(this);
	}

	restore(snapshot: Snapshot): void {
		const canvas = snapshot.resotre;

		this.stage.draw();
	}
}
