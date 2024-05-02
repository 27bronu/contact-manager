import fs from 'node:fs';
import crypto from 'node:crypto';

// File path to store data
const dataFilePath = './data.json';

const generateRandomId = () => {
    return crypto.randomBytes(16).toString('hex');
};


// Load existing data from file
let persons = [];
if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath);
    persons = JSON.parse(data);
}

// Write data to file
const saveDataToFile = () => {
    fs.writeFileSync(dataFilePath, JSON.stringify(persons, null, 2));
};

// Handler for GET 
export const handleGetPersons = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.end(JSON.stringify(persons));
};

// Handler for POST 
export const handlePostPerson = (request, response) => {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        const newPerson = JSON.parse(body);
        newPerson.id = generateRandomId(); 
        persons.push(newPerson);
        saveDataToFile();
        response.statusCode = 201;
        response.end(JSON.stringify(newPerson));
    });
};

// Handler to get details of a specific person by ID
export const handleGetPersonById = (request, response, id) => {
    const person = persons.find(p => p.id === id);
    if (!person) {
        response.statusCode = 404;
        response.end(JSON.stringify({ error: 'Person not found' }));
        return;
    }
    response.statusCode = 200;
    response.end(JSON.stringify(person));
};

// Handler to update a person
export const handleUpdatePerson = (request, response, id) => {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        const updatedPerson = JSON.parse(body);
        const index = persons.findIndex(p => p.id === id);
        if (index === -1) {
            response.statusCode = 404;
            response.end(JSON.stringify({ error: 'Person not found' }));
            return;
        }
        persons[index] = { ...persons[index], ...updatedPerson };
        saveDataToFile();
        response.statusCode = 200;
        response.end(JSON.stringify(persons[index]));
    });
};

// Handler to remove a person
export const handleDeletePerson = (request, response, id) => {
    const index = persons.findIndex(p => p.id === id);
    if (index === -1) {
        response.statusCode = 404;
        response.end(JSON.stringify({ error: 'Person not found' }));
        return;
    }
    persons.splice(index, 1);
    saveDataToFile();
    response.statusCode = 200;
    response.end(JSON.stringify({ message: 'Person removed successfully' }));
};

// Handler to add a contact to a person
export const handleAddContact = (request, response, id) => {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        const newContact = JSON.parse(body);
        const person = persons.find(p => p.id === id);
        if (!person) {
            response.statusCode = 404;
            response.end(JSON.stringify({ error: 'Person not found' }));
            return;
        }
        if (!person.contacts) {
            person.contacts = [];
        }
        person.contacts.push(newContact);
        saveDataToFile();
        response.statusCode = 201;
        response.end(JSON.stringify(person.contacts));
    });
};
