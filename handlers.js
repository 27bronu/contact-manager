
// Define the persons array
let persons = [];

// Handler for GET /api/persons
export const handleGetPersons = (request, response) => {
    response.statusCode = 200;
    response.end(JSON.stringify(persons));
};

// Handler for POST /api/persons
export const handlePostPerson = (request, response) => {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        const newPerson = JSON.parse(body);
        persons.push(newPerson);
        response.statusCode = 201;
        response.end(JSON.stringify(newPerson));
    });
};

