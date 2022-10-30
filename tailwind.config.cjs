/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#ff3e00',
				secondary: '#40b3ff'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
