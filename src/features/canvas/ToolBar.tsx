import { SHAPE_TYPE } from '@/entities/canvas/types';

import * as styles from '@/features/canvas/drawing.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { primaryColor } from '@/features/canvas/drawing.css';

interface ToolbarProps {
	selectedTool: SHAPE_TYPE;
	onToolChange: (tool: SHAPE_TYPE) => void;
	fillColor: string;
	onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	strokeWidth: number;
	onStrokeWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
import {
	Circle,
	Minus,
	Pencil,
	Pentagon,
	RectangleHorizontal,
} from 'lucide-react';
import { vars } from '@/shared/styles/vars.css';

const SHAPE_DATA = [
	{ type: SHAPE_TYPE.RECT, label: 'Rectangle', icon: <RectangleHorizontal /> },
	{ type: SHAPE_TYPE.CIRCLE, label: 'Circle', icon: <Circle /> },
	{ type: SHAPE_TYPE.POLYGON, label: 'Polygon', icon: <Pentagon /> },
	{ type: SHAPE_TYPE.LINE, label: 'Line', icon: <Minus /> },
	{ type: SHAPE_TYPE.CURVE, label: 'Curve', icon: <Pencil /> },
];

const STROKE_WIDTH_LIMITS = {
	MIN: 1,
	MAX: 30,
} as const;

function Toolbar({
	selectedTool,
	onToolChange,
	fillColor,
	onColorChange,
	strokeWidth,
	onStrokeWidthChange,
}: ToolbarProps) {
	return (
		<div className={styles.toolbarContainer}>
			{SHAPE_DATA.map(({ type, label, icon }) => (
				<button
					key={type}
					onClick={() => onToolChange(type)}
					className={styles.shapeButton}
					style={assignInlineVars({
						[primaryColor]:
							selectedTool === type ? 'pink' : vars.color['gray-200'],
					})}
					title={label}
				>
					{icon}
				</button>
			))}
			<input
				className={styles.colorPicker}
				type="color"
				value={fillColor}
				onChange={onColorChange}
			/>

			<input
				type="range"
				min={STROKE_WIDTH_LIMITS.MIN}
				max={STROKE_WIDTH_LIMITS.MAX}
				value={strokeWidth}
				onChange={onStrokeWidthChange}
			/>
		</div>
	);
}

export default Toolbar;
