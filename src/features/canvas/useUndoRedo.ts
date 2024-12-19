import { useRef, useState } from 'react';

interface UseHistory<T> {
	addState: (newState: T) => void;
	undo: () => T | null;
	redo: () => T | null;
	clearHistory: () => void;
	canUndo: boolean;
	canRedo: boolean;
}

function useHistory<T>(): UseHistory<T> {
	const undoStack = useRef<T[]>([]);
	const redoStack = useRef<T[]>([]);

	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);

	const updateHistoryState = () => {
		setCanUndo(undoStack.current.length > 0);
		setCanRedo(redoStack.current.length > 0);
	};

	const addState = (newState: T) => {
		undoStack.current.push(newState);
		redoStack.current = [];

		updateHistoryState();
	};

	const undo = () => {
		if (undoStack.current.length === 0) return null;
		const prevState = undoStack.current.pop() as T;
		redoStack.current.push(prevState);
		updateHistoryState();

		return prevState;
	};

	const redo = () => {
		if (redoStack.current.length === 0) return null;
		const nextState = redoStack.current.pop() as T;
		undoStack.current.push(nextState);
		updateHistoryState();

		return nextState;
	};

	const clearHistory = () => {
		undoStack.current = [];
		redoStack.current = [];

		updateHistoryState();
	};

	return {
		addState,
		undo,
		redo,
		clearHistory,
		canRedo,
		canUndo,
	};
}

export default useHistory;
