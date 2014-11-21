/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

	grunt.config.set('autoprefixer', {
		dist: {
			src: ['directory.angular.js'],
			dest: '.tmp/public/min/production.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
};
