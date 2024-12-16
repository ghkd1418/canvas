import useHistoryState from './useHistoryState';

interface UndoRedoState<T> {
	add: (item: T) => void;
	undo: () => T | undefined;
	redo: () => T | undefined;
	undoLength: number;
	redoLength: number;
	lastItem: T | undefined;
	lastRemovedItem: T | undefined;
}

function useUndoRedo<T>(): UndoRedoState<T> {
	const undoHistory = useHistoryState<T>();
	const redoHistory = useHistoryState<T>();

	const add = (item: T) => {
		undoHistory.addHistory(item);
		redoHistory.clear();
	};

	const undo = () => {
		try {
			const lastItem = undoHistory.removeHistory();
			if (lastItem !== undefined) {
				redoHistory.addHistory(lastItem);
			}
			return lastItem;
		} catch (error) {
			console.warn('Cannot undo: ', error);
			return undefined;
		}
	};

	const redo = () => {
		try {
			const lastUndoneItem = redoHistory.removeHistory();
			if (lastUndoneItem !== undefined) {
				undoHistory.addHistory(lastUndoneItem);
			}
			return lastUndoneItem;
		} catch (error) {
			console.warn('Cannot redo: ', error);
			return undefined;
		}
	};

	return {
		add,
		undo,
		redo,
		undoLength: undoHistory.length,
		redoLength: redoHistory.length,
		lastItem: undoHistory.length > 0 ? undoHistory.peekHistory() : undefined,
		lastRemovedItem:
			redoHistory.length > 0 ? redoHistory.peekHistory() : undefined,
	};
}

export default useUndoRedo;
