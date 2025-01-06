import type { Command } from './Command';

export class HistoryManager {
	private commands: Command[] = [];
	private currentIndex = -1;

	constructor() {}

	execute(command: Command): void {
		command.execute();
		this.commands.push(command);

		this.currentIndex++;
	}

	undo(): void {
		if (this.canUndo()) {
			this.commands[this.currentIndex].undo();
			this.currentIndex--;
		}
	}

	redo(): void {
		if (this.canRedo()) {
			this.currentIndex++;
			this.commands[this.currentIndex].redo();
		}
	}

	canUndo(): boolean {
		return this.currentIndex >= 0;
	}

	canRedo(): boolean {
		return this.currentIndex < this.commands.length - 1;
	}
}
