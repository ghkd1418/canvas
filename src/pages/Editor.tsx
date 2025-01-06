import { useEffect, useRef, useState } from 'react';

import type { ShapeType } from '@/entities/canvas/types';
import { SHAPE_TYPE } from '@/entities/canvas/types';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { Redo2, Undo2 } from 'lucide-react';

import { Canvas } from '../entities/canvas/Canvas';
import { HistoryManager } from '../features/canvas/HistoryManager';
import type { ShapeProps } from '../features/canvas/types';
import { AddShapeCommand } from '../features/tools/AddShapeCommand';
import Toolbar from '../widgets/ToolBar';

import * as styles from '@/pages/drawing.css';

const DEFAULT_SHAPE_WIDTH = 100;
const DEFAULT_SHAPE_HEIGHT = 50;
const DEFAULT_FILL_COLOR = '#169f8c';
const DEFAULT_STROKE_WIDTH = 1;
const DEFAULT_STROKE_COLOR = '#000000';

const Editor = () => {
	const stageRef = useRef<Stage | null>(null);
	const layerRef = useRef<Layer | null>(null);
	const canvasRef = useRef<Canvas | null>(null);

	const historyManager = useRef<HistoryManager | null>(null);

	const [selectedTool, setSelectedTool] = useState<ShapeType>(
		SHAPE_TYPE.RECTANGLE,
	);
	const [fillColor, setFillColor] = useState<string>(DEFAULT_FILL_COLOR);
	const [strokeWidth, setStrokeWidth] = useState<number>(DEFAULT_STROKE_WIDTH);

	const handleToolChange = (tool: ShapeType) => {
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

	useEffect(() => {
		const stage = new Stage({
			container: 'canvas-container',
			width: 800,
			height: 600,
		});
		const layer = new Layer();
		const canvas = new Canvas(stage, layer);

		stage.add(layer);

		stageRef.current = stage;
		layerRef.current = layer;
		canvasRef.current = canvas;

		historyManager.current = new HistoryManager();
	}, []);

	const handleUndo = () => {
		historyManager.current?.undo();
	};

	const handleRedo = () => {
		historyManager.current?.redo();
	};

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const startX = event.clientX - rect.left;
		const startY = event.clientY - rect.top;

		let shapeProps: ShapeProps;

		switch (selectedTool) {
			case SHAPE_TYPE.LINE: {
				break;
			}
			case SHAPE_TYPE.CURVE: {
				break;
			}
			case SHAPE_TYPE.REGULAR_POLYGON: {
				break;
			}
			default: {
				shapeProps = {
					type: selectedTool,
					config: {
						x: startX,
						y: startY,
						width: DEFAULT_SHAPE_WIDTH,
						height: DEFAULT_SHAPE_HEIGHT,
						fill: fillColor,
						stroke: DEFAULT_STROKE_COLOR,
						strokeWidth: strokeWidth,
					},
				};

				if (canvasRef.current && historyManager.current) {
					const addShapeCommand = new AddShapeCommand(
						canvasRef.current,
						shapeProps,
					);

					historyManager.current.execute(addShapeCommand);
				}

				break;
			}
		}
	};

	return (
		<div className={styles.canvas}>
			<div className={styles.canvasKit}>
				<Toolbar
					selectedTool={selectedTool}
					onToolChange={handleToolChange}
					fillColor={fillColor}
					onColorChange={handleColorChange}
					strokeWidth={strokeWidth}
					onStrokeWidthChange={handleStrokeWidthChange}
				/>
				<div className={styles.undoRedoContainer}>
					<button
						className={styles.undoRedoButton}
						onClick={handleUndo}
						// disabled={!canUndo}
					>
						<Undo2 size={20} strokeWidth={2} />
					</button>
					<button
						className={styles.undoRedoButton}
						onClick={handleRedo}
						// disabled={!canRedo}
					>
						<Redo2 size={20} strokeWidth={2} />
					</button>
				</div>
				<div
					id="canvas-container"
					style={{ border: 'solid' }}
					onMouseDown={handleMouseDown}
				></div>
			</div>
		</div>
	);
};

export default Editor;
