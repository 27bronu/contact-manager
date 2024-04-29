import { handleGetPersons, handlePostPerson } from './handlers.js';


export const handleRequest = (request, response) => {

    response.setHeader('Content-Type', 'application/json');

    if (request.method === 'GET' && request.url === '/api/persons') {
        handleGetPersons(request, response);
    }
    else if (request.method === 'POST' && request.url === '/api/persons') {
        handlePostPerson(request, response);
    } else {
        // Route not found
        response.statusCode = 404;
        response.end(JSON.stringify({ error: 'Route not found' }));
    }
};
