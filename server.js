#!/usr/bin/env node

/**
 * Module dependencies.
 */
const app = require('./config/app');  // Import the app from the app.js in the config folder
const debug = require('debug')('infrproject:server');  // Debugging module to print server status
const http = require('http');  // Node's HTTP module

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');  // Normalize port for use in server
app.set('port', port);  // Set port in the app configuration

/**
 * Create HTTP server.
 */
const server = http.createServer(app);  // Create a server with the app as the handler

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);  // Handle errors on the server
server.on('listening', onListening);  // Handle server start event

/**
 * Normalize a port into a number, string, or false.
 * This function checks if the given value is a valid port.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // If it's not a number, treat it as a named pipe
    return val;
  }

  if (port >= 0) {
    // If it's a valid number and >= 0, return as port number
    return port;
  }

  return false;  // Return false if not valid
}

/**
 * Event listener for HTTP server "error" event.
 * This function handles specific errors for the server.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;  // Rethrow if the error is not related to the listening process
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);  // Exit the process if elevated privileges are needed
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);  // Exit the process if the port is already in use
      break;
    default:
      throw error;  // Throw error if not one of the above
  }
}

/**
 * Event listener for HTTP server "listening" event.
 * This function will execute when the server starts listening.
 */
function onListening() {
  const addr = server.address();  // Get server address
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);  // Log the listening status
}
