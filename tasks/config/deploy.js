


    module.exports = function(grunt) {

        grunt.config.set('ftp', {

            auth: {
                host: 'server.com',
                port: 22,
                authKey: 'key1'
            },
            src: '/path/to/source/folder',
            dest: '/path/to/destination/folder',
            exclusions: ['/path/to/source/folder/**/.DS_Store', '/path/to/source/folder/**/Thumbs.db', 'dist/tmp'],
            server_sep: '/'

        });

        grunt.loadNpmTasks('grunt-sftp-deploy');
    };