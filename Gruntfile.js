module.exports = grunt => {
  grunt.loadNpmTasks('grunt-aws');

  grunt.initConfig({
    aws: grunt.file.readJSON('aws-credentials.json'),
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: 'auction-component',
        region: 'us-west-1',
      },
      build: {
        cwd: 'client/public/',
        src: 'bundle.js',
      },
    },
  });

  grunt.registerTask('default', ['s3']);
};
