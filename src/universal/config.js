/**
 * Created by dinhquangtrung on 11/13/15.
 */

/**
 * Some variables are stored in environment
 * Checkout `env` directory at the project root
 * To make the environment variables work correctly, at your terminal run:
 * ```
 *    source ./env/dev.env       # Sourcing the environment file
 *    node app.js                # Running app with loaded env variables
 * ```
 * If you don't have the env file, contact repository maintainer.
 */
const getEnv = name => {
  const value = process.env[name];
  if (value === undefined) {
    console.error('ERROR: Environment variable not found: ', name);
  }
  return value;
};

export default {
  HTTP_PORT: () => 8011, // Make sure this is the same with apiPort in package.json

  PUSHER: {
    KEY: () => 'b071ff779d07767b3499',
    APP_ID: () => getEnv('DAVE_PUSHER_APP_ID'),
    SECRET: () => getEnv('DAVE_PUSHER_SECRET'),
  },

  JIRA: {
    BASE64_AUTH: () => getEnv('JIRA_BASE64_AUTH'),
  },
};
