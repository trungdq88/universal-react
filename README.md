# About
Universal application boilerplate using Express and React (ehh.. no server render stuffs here).

# Initial dev setup
Make sure you have NodeJS v4 or above. 

## Start server & client
```bash
npm install
npm start 
``` 

- Client side: `http://localhost:8763` should now be live with Hot Module Replacement.
- Server side: `http://localhost:8011`, auto restart when file changes (thanks `nodemon`).

# Production build

```bash
npm install
npm run production 
```

Production code placed at `build`

# Run production

```bash
source ./env/prod.env        # Sourcing environment variables
cd path/to/build/dir        # Navigate to build dir 
node app.js                 # Run the app
```

**IMPORTANT**: you have to `cd` to the build directory, then run `node app.js`. This is 
because webpack changed the `__dirname__` variable. Still looking for a solution.

App should be live at `http://localhost:8011` (port can be configured in `universal/config.js`)

# Environment variable files

## Config in your machine
Some variables are stored in environment, checkout `env` directory at the project root.

To make the environment variables work correctly, at your terminal run:

```bash
   source ./env/dev.env       # Sourcing the environment file
   node app.js               # Running app with loaded env variables
```

If you don't have the `.env` file, contact repository maintainer.

## Config in AWS Elastic Beanstalk

Go to your instance dashboard > Configuration > Software configuration. Set environment variable there.

# Test

```bash
npm test
```

Coverage report placed in `./coverage/` directory

# Other commands
- `npm run staging` build for `staging` environment. 
- `npm lint`: linting.

# Docker

Docker image expose to port `80`. Run this project in a docker container:

```bash
    docker-compose up
```
