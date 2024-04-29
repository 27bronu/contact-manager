import http from 'http';
import { handleRequest } from './router.js';

// Create an HTTP server instance
const server = http.createServer(handleRequest);

// Define the port number
const port = process.env.PORT || 3000;

// Start the server listening on the specified port
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
