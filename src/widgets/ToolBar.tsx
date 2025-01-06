import type { ShapeType } from '@/entities/canvas/types';
import { SHAPE_TYPE } from '@/entities/canvas/types';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
	Circle,
	Minus,
	Pencil,
	Pentagon,
	RectangleHorizontal,
} from 'lucide-react';

import { primaryColor } from '@/pages/drawing.css';
import * as styles from '@/pages/drawing.css';
import { vars } from '@/shared/styles/vars.css';

interface ToolbarProps {
	selectedTool: ShapeType;
	onToolChange: (tool: ShapeType) => void;
	fillColor: string;
	onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	strokeWidth: number;
	onStrokeWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SHAPE_DATA = [
	{
		type: SHAPE_TYPE.RECTANGLE,
		label: 'Rectangle',
		icon: <RectangleHorizontal />,
	},
	{ type: SHAPE_TYPE.CIRCLE, label: 'Circle', icon: <Circle /> },
	{ type: SHAPE_TYPE.REGULAR_POLYGON, label: 'Polygon', icon: <Pentagon /> },
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
				type="color"
				className={styles.colorPicker}
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
