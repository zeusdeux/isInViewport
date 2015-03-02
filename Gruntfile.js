module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  // normalize package name to camel case from hyphenated style thats in package.json
  pkg.name = pkg.name.split('-').map(function(v, i){ if (0 === i) return v; else return v[0].toUpperCase() + v.slice(1); }).join('');
  grunt.initConfig({
    pkg: pkg,
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
        'examples/*.js',
        'tests/*.js'
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
        globals: {
          'describe': true,
          'should': true,
          'it': true,
          'before': true,
          'after': true
        },
        trailing: true,
        browser: true,
        devel: true,
        jquery: true,
        node: true
      }
    },
    blanket_mocha: {
      all: ['tests/*.html'],
      options: {
        threshold: 80
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-blanket-mocha');
  grunt.registerTask('default', ['jshint', 'blanket_mocha', 'uglify']);
  grunt.registerTask('min', ['blanket_mocha', 'uglify']);
  grunt.registerTask('test', ['blanket_mocha']);
};
