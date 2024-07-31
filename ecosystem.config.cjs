module.exports = {
  apps: [
    {
      name: 'app_creame',
      script: 'app.js', // Archivo de entrada de tu aplicación
      env: {
        NODE_ENV: 'development'
      },
      env_production_creame: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'another_app',
      script: 'another_app.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production_creame: {
        NODE_ENV: 'production'
      }
    }
  ]
};