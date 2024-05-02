import { handleGetPersons, handlePostPerson, handleGetPersonById, handleUpdatePerson, handleDeletePerson, handleAddContact } from './handlers.js';

export const handleRequest = (request, response) => {
    // Existing routes
    if (request.method === 'GET' && request.url === '/api/persons') {
        handleGetPersons(request, response);
    } else if (request.method === 'POST' && request.url === '/api/persons') {
        handlePostPerson(request, response);
    }
    // New routes
    else if (request.method === 'GET' && request.url.startsWith('/api/persons/')) {
        const id = request.url.split('/')[3];
        handleGetPersonById(request, response, id);
    } else if (request.method === 'PUT' && request.url.startsWith('/api/persons/')) {
        const id = request.url.split('/')[3];
        handleUpdatePerson(request, response, id);
    } else if (request.method === 'DELETE' && request.url.startsWith('/api/persons/')) {
        const id = request.url.split('/')[3];
        handleDeletePerson(request, response, id);
    } else if (request.method === 'POST' && request.url.startsWith('/api/persons/')) {
        const id = request.url.split('/')[3];
        handleAddContact(request, response, id);
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({ error: 'Route not found' }));
    }
};
