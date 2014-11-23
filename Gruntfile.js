module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jshint: {
            all: ['src/js/app.js']
        },

        cssmin: {
            combine: {
                files: {
                    'build/css/app.css': ['src/css/app.css']
                }
            }
        },

        concat: {
            dist: {
                src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/underscore/underscore-min.js', 'src/js/app.js'],
                dest: 'build/js/main.js'
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

        //        express: {
        //            all: {
        //                options: {
        //                    bases: ['.'],
        //                    port: 9000,
        //                    hostname: "localhost",
        //                    livereload: true
        //                }
        //            }
        //        },

        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'jshint']
            },
            css: {
                files: ['src/css/*.css', 'src/sass/*.scss', '!src/css/min.*'],
                tasks: ['compass', 'cssmin']
            },
        },

        //        open: {
        //            all: {
        //                path: 'http://localhost:9000/tictac/src/'
        //            }
        //        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['tests/tests.js']
            }
        }


    });

    grunt.registerTask('default', ['compass', 'cssmin', 'concat']);
    grunt.registerTask('mocha', ['mochaTest']);

}
