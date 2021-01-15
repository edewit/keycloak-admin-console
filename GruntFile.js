const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-contrib-copy');

  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'checkout'));
  grunt.initConfig({
    gitclone: {
      clone: {
        options: {
          repository: 'https://github.com/keycloak/keycloak-admin-ui.git',
          branch: 'master',
          directory: folder,
        },
      },
    },
    sed: {
      image: {
        path: path.join(folder, 'src/'),
        pattern: /".+?svg"/g,
        replacement: (match) => `"./img${match.substring(1)}`,
        recursive: true,
      },
      router: {
        path: path.join(folder, 'src/App.tsx'),
        pattern: 'BrowserRouter',
        replacement: 'HashRouter',
        recursive: true,
      },
    },
    copy: {
      source: {
        cwd: path.join(folder, 'src'),
        src: ['**/*'],
        dest: 'app/keycloak/',
        expand: true,
      },
    },
  });

  grunt.registerTask('default', ['gitclone:clone', 'sed', 'copy:source']);
};
