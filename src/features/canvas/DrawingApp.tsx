import React, { useRef, useState } from 'react';

import { SHAPE_TYPE } from '../../entities/canvas/types';

import type { KonvaShape } from './KonvaShape';

import type { KonvaDrawingTool } from './KonvaDrawingTool';

import Toolbar from './ToolBar';

interface DrawingAppProps {
	drawingTool: KonvaDrawingTool;
	containerRef: React.RefObject<HTMLDivElement>;
}

const DEFAULT_STROKE_WIDTH = 5;
const DEFAULT_FILL_COLOR = '#169f8c';
const DEFAULT_STROKE_COLOR = '#000000';

const DEFAULT_SHAPE_WIDTH = 100;
const DEFAULT_SHAPE_HEIGHT = 50;
const DEFAULT_POLYGON_SIDES = 5;

const DrawingApp = ({ containerRef, drawingTool }: DrawingAppProps) => {
	const [selectedTool, setSelectedTool] = useState<SHAPE_TYPE>(SHAPE_TYPE.RECT);
	const [fillColor, setFillColor] = useState<string>(DEFAULT_FILL_COLOR);
	const [strokeWidth, setStrokeWidth] = useState<number>(DEFAULT_STROKE_WIDTH);

	const undoStack = useRef<KonvaShape[]>([]);

	const redoStack = useRef<KonvaShape[]>([]);

	const handleToolChange = (tool: SHAPE_TYPE) => {
		setSelectedTool(tool);
	};

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFillColor(event.target.value);
	};

	const handleStrokeWidthChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setStrokeWidth(Number(event.target.value));
	};

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const startX = event.clientX - rect.left;
		const startY = event.clientY - rect.top;

		let shape: KonvaShape | null = null;

		switch (selectedTool) {
			case SHAPE_TYPE.LINE: {
				const tempShape = drawingTool.createShape(selectedTool, {
					points: [startX, startY],
					stroke: DEFAULT_STROKE_COLOR,
					strokeWidth: strokeWidth,
					lineCap: 'round',
					lineJoin: 'round',
				});
				drawingTool.addShape(tempShape);

				const handleMouseMoveHandler = (moveEvent: MouseEvent) => {
					const endX = moveEvent.clientX - rect.left;
					const endY = moveEvent.clientY - rect.top;
					tempShape.points([startX, startY, endX, endY]);
				};

				const handleMouseUpHandler = (upEvent: MouseEvent) => {
					const endX = upEvent.clientX - rect.left;
					const endY = upEvent.clientY - rect.top;

					shape = drawingTool.createShape(selectedTool, {
						points: [startX, startY, endX, endY],
						stroke: DEFAULT_STROKE_COLOR,
						strokeWidth: strokeWidth,
						lineCap: 'round',
						lineJoin: 'round',
					});

					if (tempShape) {
						drawingTool.removeShape(tempShape);
					}
					drawingTool.addShape(shape);

					undoStack.current.push(shape);

					document.removeEventListener('mousemove', handleMouseMoveHandler);
					document.removeEventListener('mouseup', handleMouseUpHandler);
				};

				document.addEventListener('mousemove', handleMouseMoveHandler);
				document.addEventListener('mouseup', handleMouseUpHandler);

				break;
			}
			case SHAPE_TYPE.CURVE: {
				const points: number[] = [startX, startY];
				let tempShape: KonvaShape;

				const handleMouseMove = (moveEvent: MouseEvent) => {
					const endX = moveEvent.clientX - rect.left;
					const endY = moveEvent.clientY - rect.top;

					if (tempShape) {
						tempShape.points(points);
					} else {
						tempShape = drawingTool.createShape(selectedTool, {
							points: points,
							stroke: DEFAULT_STROKE_COLOR,
							strokeWidth: strokeWidth,
							lineCap: 'round',
							lineJoin: 'round',
							tension: 0.5,
						});

						drawingTool.addShape(tempShape);
					}

					if (points.length > 2) {
						points.push(
							(points[points.length - 2] + endX) / 2,
							(points[points.length - 1] + endY) / 2,
						);
					}

					points.push(endX, endY);
					shape?.points(points);
				};

				const handleMouseUp = () => {
					shape = drawingTool.createShape(selectedTool, {
						points: points,
						stroke: DEFAULT_STROKE_COLOR,
						strokeWidth: strokeWidth,
						lineCap: 'round',
						lineJoin: 'round',
						tension: 0.5,
					});

					if (tempShape) {
						drawingTool.removeShape(tempShape);
					}
					drawingTool.addShape(shape);

					undoStack.current.push(shape);

					document.removeEventListener('mousemove', handleMouseMove);
					document.removeEventListener('mouseup', handleMouseUp);
				};

				document.addEventListener('mousemove', handleMouseMove);
				document.addEventListener('mouseup', handleMouseUp);

				break;
			}
			case SHAPE_TYPE.POLYGON: {
				shape = drawingTool.createShape(SHAPE_TYPE.POLYGON, {
					x: startX,
					y: startY,
					sides: DEFAULT_POLYGON_SIDES,
					radius: 50,
					fill: fillColor,
					stroke: DEFAULT_STROKE_COLOR,
					strokeWidth: strokeWidth,
				});
				drawingTool.addShape(shape);
				undoStack.current.push(shape);

				break;
			}
			default: {
				shape = drawingTool.createShape(selectedTool, {
					x: startX,
					y: startY,
					width: DEFAULT_SHAPE_WIDTH,
					height: DEFAULT_SHAPE_HEIGHT,
					fill: fillColor,
					stroke: DEFAULT_STROKE_COLOR,
					strokeWidth: strokeWidth,
				});

				drawingTool.addShape(shape);
				undoStack.current.push(shape);

				break;
			}
		}
	};

	const handleUndo = () => {
		if (undoStack.current.length > 0) {
			const lastShape = undoStack.current.pop();
			if (lastShape) {
				drawingTool.removeShape(lastShape);
				redoStack.current.push(lastShape);
			}
		}
	};

	const handleRedo = () => {
		if (redoStack.current.length > 0) {
			const lastRemovedShape = redoStack.current.pop();
			if (lastRemovedShape) {
				drawingTool.addShape(lastRemovedShape);
				undoStack.current.push(lastRemovedShape);
			}
		}
	};

	return (
		<div style={{ padding: '10%' }}>
			<Toolbar
				selectedTool={selectedTool}
				onToolChange={handleToolChange}
				fillColor={fillColor}
				onColorChange={handleColorChange}
				strokeWidth={strokeWidth}
				onStrokeWidthChange={handleStrokeWidthChange}
			/>
			<button onClick={handleUndo}>Undo</button>
			<button onClick={handleRedo}>Redo</button>
			<div
				ref={containerRef}
				onMouseDown={handleMouseDown}
				style={{
					width: window.innerWidth * 0.8,
					height: window.innerHeight * 0.8,
					border: '1px solid black',
				}}
			/>
		</div>
	);
};

export default DrawingApp;
