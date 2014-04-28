module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*\n' + ' * @author  Mudit Ameta\n' + ' * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT\n' + ' */\n'
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
        immed: true,
        indent: 2,
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
    },
    mocha_phantomjs: {
      src: ['tests/*.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.registerTask('default', ['jshint', 'mocha_phantomjs', 'uglify']);
  grunt.registerTask('min', ['mocha_phantomjs', 'uglify']);
  grunt.registerTask('test', ['mocha_phantomjs']);
};
