module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
	plugins: [
		require('windicss/plugin/aspect-ratio'),
	],
	shortcuts: {
		'flex-center': 'flex justify-center items-center',
		'flex-col-center': 'flex flex-col justify-center items-center',
		'flex-center': 'flex justify-center items-center',
		'wh-screen': 'w-screen h-screen'
	},
};
