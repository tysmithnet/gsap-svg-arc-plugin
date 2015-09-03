module.exports = function(grunt) {

    grunt.initConfig({
        ts: {
            dist: {
                src: [
                    "SvgArc.ts",
                    "SvgArcPlugin.ts"
                ],
                options: {
                    comments: true
                }
            }
        },
        'string-replace': {
            dist: {
                files: {
                    'gsap-svg-arc-plugin.js': 'template.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: "/**__CODE_GOES_HERE__**/",
                            replacement: "<%= grunt.file.read('SvgArcPlugin.js') %>"
                        }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-ts');
    grunt.registerTask('default', ['ts:dist', 'string-replace:dist']);

};