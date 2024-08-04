// module.exports = {
//   apps: [
//     {
//       name: 'app_creame',
//       script: 'app.js', // Archivo de entrada de tu aplicación
//       env: {
//         NODE_ENV: 'development'
//       },
//       env_production_creame: {
//         NODE_ENV: 'production'
//       }
//     },
//     {
//       name: 'another_app',
//       script: 'another_app.js',
//       env: {
//         NODE_ENV: 'development'
//       },
//       env_production_creame: {
//         NODE_ENV: 'production'
//       }
//     }
//   ]
// };

module.exports = {
  apps: [
    {
      name: 'react-app',
      script: 'node_modules/.bin/http-server',
      args: 'build -p 3400',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};