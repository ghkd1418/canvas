import React, { useState } from 'react';

import { SHAPE_TYPE } from '../../entities/canvas/types';

import type { KonvaDrawingTool, KonvaShape } from './konva-drawing-tool';

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
const DEFALT_POLYGON_SIDES = 5;

const DrawingApp: React.FC<DrawingAppProps> = ({
	containerRef,
	drawingTool,
}) => {
	const [selectedTool, setSelectedTool] = useState<SHAPE_TYPE>(SHAPE_TYPE.RECT);
	const [fillColor, setFillColor] = useState<string>(DEFAULT_FILL_COLOR);
	const [strokeWidth, setStrokeWidth] = useState<number>(DEFAULT_STROKE_WIDTH);

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

		let shape: KonvaShape;

		switch (selectedTool) {
			case SHAPE_TYPE.LINE: {
				shape = drawingTool.createShape(selectedTool, {
					points: [startX, startY, startX, startY],
					stroke: DEFAULT_STROKE_COLOR,
					strokeWidth: strokeWidth,
					lineCap: 'round',
					lineJoin: 'round',
				});

				const handleMouseMove = (moveEvent: MouseEvent) => {
					const endX = moveEvent.clientX - rect.left;
					const endY = moveEvent.clientY - rect.top;
					shape.points([startX, startY, endX, endY]);
					shape.getKonvaShape().getLayer()?.batchDraw();
				};

				const handleMouseUp = () => {
					document.removeEventListener('mousemove', handleMouseMove);
					document.removeEventListener('mouseup', handleMouseUp);
				};

				document.addEventListener('mousemove', handleMouseMove);
				document.addEventListener('mouseup', handleMouseUp);

				break;
			}
			case SHAPE_TYPE.CURVE: {
				const points: number[] = [startX, startY];

				shape = drawingTool.createShape(selectedTool, {
					points: points,
					stroke: DEFAULT_STROKE_COLOR,
					strokeWidth: strokeWidth,
					lineCap: 'round',
					lineJoin: 'round',
					tension: 0.5,
				});

				const handleMouseMove = (moveEvent: MouseEvent) => {
					const endX = moveEvent.clientX - rect.left;
					const endY = moveEvent.clientY - rect.top;

					if (points.length > 2) {
						points.push(
							(points[points.length - 2] + endX) / 2,
							(points[points.length - 1] + endY) / 2,
						);
					}

					points.push(endX, endY);

					shape.points(points);
				};

				const handleMouseUp = () => {
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
					sides: DEFALT_POLYGON_SIDES,
					radius: 50,
					fill: fillColor,
					stroke: DEFAULT_STROKE_COLOR,
					strokeWidth: strokeWidth,
				});

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

				break;
			}
		}

		drawingTool.addShape(shape);
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
