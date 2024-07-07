export default {
    apps: [
      {
        name: 'app_creame',
        script: 'serve',
        args: '-s dist',
        env: {
          NODE_ENV: 'production',
        }
      }
    ]
  };