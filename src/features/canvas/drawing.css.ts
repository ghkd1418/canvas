import { createVar, style } from '@vanilla-extract/css';
import { button } from '@/shared/styles/button.css';
import { sprinkles } from '@/shared/styles/sprinkles.css';
import { vars } from '@/shared/styles/vars.css';

export const canvas = style([
	sprinkles({
		paddingY: '8x',
	}),
]);

export const stage = style([
	sprinkles({
		background: {
			lightMode: 'white',
		},
		borderRadius: {
			mobile: '1x',
			desktop: '4x',
		},
	}),
	{
		boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px  rgba(0, 0, 0, 1)',
	},
]);

export const canvasKit = style([
	sprinkles({}),
	{
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
]);

export const toolbarContainer = style([
	sprinkles({}),
	{
		display: 'flex',
		alignItems: 'center',
	},
]);

export const colorPicker = style([
	{
		width: '40px',
		height: '40px',
		border: 'none',
		borderRadius: '30px',
		appearance: 'none',
		backgroundColor: 'transparent',

		WebkitAppearance: 'none',
		MozAppearance: 'none',

		'::-moz-color-swatch': {
			borderRadius: '30px',
			border: 'none',
		},
		':hover': {
			cursor: 'pointer',
		},
	},
]);

export const undoRedoContainer = style([
	sprinkles({
		borderRadius: {
			mobile: '1x',
			desktop: '2x',
		},
	}),
	{
		alignSelf: 'flex-end',
		backgroundColor: vars.color['gray-200'],
	},
]);

export const primaryColor = createVar();

export const shapeButton = style([
	button,
	{
		backgroundColor: primaryColor,
	},
]);

export const undoRedoButton = style([
	button,
	{
		backgroundColor: vars.color['gray-200'],
	},
]);
