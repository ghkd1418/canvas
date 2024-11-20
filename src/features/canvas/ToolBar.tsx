import { SHAPE_TYPE } from '@/entities/canvas/types';

interface ToolbarProps {
	selectedTool: SHAPE_TYPE;
	onToolChange: (tool: SHAPE_TYPE) => void;
	fillColor: string;
	onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	strokeWidth: number;
	onStrokeWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const shapeTypes = [
	{ type: SHAPE_TYPE.RECT, label: 'Rectangle' },
	{ type: SHAPE_TYPE.CIRCLE, label: 'Circle' },
	{ type: SHAPE_TYPE.POLYGON, label: 'Polygon' },
	{ type: SHAPE_TYPE.LINE, label: 'Line' },
	{ type: SHAPE_TYPE.CURVE, label: 'Curve' },
];

const STROKE_WIDTH_LIMITS = {
	MIN: 5,
	MAX: 50,
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
		<div>
			{shapeTypes.map(({ type, label }) => (
				<button
					key={type}
					onClick={() => onToolChange(type)}
					className={selectedTool === type ? 'active' : ''}
				>
					{label}
				</button>
			))}
			<input type="color" value={fillColor} onChange={onColorChange} />
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
