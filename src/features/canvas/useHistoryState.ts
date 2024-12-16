import { useRef, useState } from 'react';

interface HistoryState<T> {
	addHistory: (item: T) => void;
	removeHistory: () => T | undefined;
	peekHistory: () => T | undefined;
	length: number;
	clear: () => void;
}

function useHistoryState<T>(maxSize: number = 100): HistoryState<T> {
	const historyStack = useRef<T[]>([]);
	const [length, setLength] = useState(0);

	const addHistory = (item: T) => {
		if (historyStack.current.length >= maxSize) {
			historyStack.current.shift();
		}
		historyStack.current.push(item);
		setLength(historyStack.current.length);
	};

	const removeHistory = () => {
		if (historyStack.current.length === 0) {
			return;
		}
		const item = historyStack.current.pop()!;
		setLength(historyStack.current.length);
		return item;
	};

	const peekHistory = () => {
		if (historyStack.current.length === 0) {
			return;
		}
		return historyStack.current[historyStack.current.length - 1];
	};

	const clear = () => {
		historyStack.current = [];
		setLength(0);
	};

	return { addHistory, removeHistory, peekHistory, length, clear };
}

export default useHistoryState;
