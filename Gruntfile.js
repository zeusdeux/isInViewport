module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			option: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'lib/<%= pkg.name %>.min.js': ['lib/<%= pkg.name %>.js']
				}
			}
		},
		jshint: {
			src: [
				'Gruntfile.js',
				'lib/isInViewport.js',
				'examples/*.js'
			],
			options: {
				eqeqeq: true,
				camelcase: true,
				immed: true,
				indent: 4,
				latedef: 'nofunc',
				newcap: true,
				noempty: true,
				quotmark: 'single',
				undef: true,
				unused: true,
				globals: {},
				trailing: true,
				browser: true,
				devel: true,
				jquery: true,
				node: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['jshint', 'uglify']);
};