export interface ITheme {
	colors: {
		primary: string;
		primary_light: string;
		primary_dark: string;
		secondary: string;
		secondary_light: string;
		secondary_dark: string;
		background: string;
		white: string;
		lighter: string;
		light: string;
		light_transparent: string;
		light_message: string;
		regular: string;
		dark: string;
		darker: string;
		black: string;
		text_black: string;
		text_white: string;
		text_desable: string;
		placeholder: string;
		completed: string;
		success: string;
		success_light: string;
		border: string;

		warning: string;
		error: string;
		error_light: string;

		info: string;
		info_light: string;
		back: string;
		back_light: string;
		transparent: string;
		darkTransparent: string;
		whiteTransparent: string;
		calendar: string;
		calendar_dark: string;
		danger: string;
		alert: string;
	};
	fonts: {
		size: {
			small: string;
			normal: string;
			large: string;
		};
	};
	content_width: string;
}
