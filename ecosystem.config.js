export default {
    apps: [
      {
        name: 'app_creame',
        script: 'npm',
        args: 'run dev',
        watch: true,
        env: {
          NODE_ENV: 'development',
        }
      }
    ]
  };