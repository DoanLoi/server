module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'dvl',
      script: 'src/server.js',
      watch: true,

      instances: "max", // 0 for all
      exec_mode: "fork",

      cwd: "./",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      out_file: "../logs/out-0.log",
      error_file: "../logs/err-0.log",
      watch: true,
      exec_interpreter: "babel-node",// This configuration is to use the babel-node to execute the nodejs file
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}