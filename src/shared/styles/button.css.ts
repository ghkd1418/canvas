import { sprinkles } from '@/shared/styles/sprinkles.css';
import { style } from '@vanilla-extract/css';

export const button = style([
	sprinkles({
		borderRadius: {
			mobile: '1x',
			desktop: '2x',
		},
		paddingX: {
			mobile: '3x',
			desktop: '4x',
		},
	}),
	{
		border: 'none',
		':hover': {
			opacity: 0.6,
			border: 'none',
			outline: 'none',
		},
		':focus': {
			border: 'none',
			outline: 'none',
		},
	},
]);
