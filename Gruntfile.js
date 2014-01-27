/*global module:true */

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    concat : {
      dist : {
        src  : ['src/jsonFormatter.js'],
        dest : 'dist/jsonFormatter.js'
      }
    },

    uglify : {
      dist : {
        src  : ['dist/jsonFormatter.js'],
        dest : 'dist/jsonFormatter.min.js'
      }
    },

    jshint : {
      options : {
        jshintrc : './.jshintrc'
      },
      all     : [
        'Gruntfile.js',
        'src/js/**/*.js',
        'spec/**/*.js',
      ]
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },

    jasmine : {
      test : {
        src     : [
          'vendor/jquery.min.js',
          'src/jsonFormatter.js'
        ],
        options : {
          helpers : 'spec/helpers/*.js',
          specs   : [
            'spec/**/*Spec.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('build', ['jshint', 'test', 'sass', 'concat', 'uglify', 'jasmine']);
};
