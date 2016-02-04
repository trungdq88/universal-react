/**
 * Created by dinhquangtrung on 11/14/15.
 */
import express from 'express';
import config from '../universal/config.js';
import router from './router';
import bodyParser from 'body-parser';

// Error reporting
process.on('uncaughtException', (err) => {
  console.log(err);
});

// Start express server
const server = express();

// Serve static files at root url (React/Redux client)
server.use('/', express.static('client'));
server.use(bodyParser.json());       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
}));
/**
 * Set up API server
 */
const startApi = () => {
  // API routes
  server.use('/api', router);

  // Start server
  server.listen(config.HTTP_PORT(), () => {
    console.log('Express server listening on port ' + config.HTTP_PORT());
  });
};

export default startApi;
