module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            all: ['src/js/app.js']
        },

        cssmin: {
            combine: {
                files: {
                    'build/css/app.min.css': ['bower_components/bootstrap/dist/css/bootstrap.min.css', 'bower_components/ngDialog/css/ngDialog.min.css', 'src/css/app.css']
                }
            }
        },

        concat: {
            dist: {
                src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/underscore/underscore-min.js', 'bower_components/angularjs/angular.min.js', 'bower_components/angular-route/angular-route.min.js', 'bower_components/kineticjs/kinetic.min.js', 'bower_components/ngDialog/js/ngDialog.min.js', 'src/js/app.js'],
                dest: 'build/js/app.min.js'
            }
        },
        
        compass: {
            dev: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'src/css'
                }
            }
        },

        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'jshint']
            },
            css: {
                files: ['src/css/*.css', 'src/sass/*.scss', '!src/css/min.*'],
                tasks: ['compass', 'cssmin']
            },
        }

    });

    grunt.registerTask('default', ['compass', 'cssmin', 'concat']);
    grunt.registerTask('mocha', ['mochaTest']);

}
