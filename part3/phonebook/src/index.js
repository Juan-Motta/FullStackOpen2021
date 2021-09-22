const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// INITIALIZATIONS

const app = express();

const PORT = process.env.PORT || 3001;

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

//MIDDLEWARES

app.use(express.json());

app.use(cors());

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}));

//ROUTES

app.get('/', (req, res) => {
    res.send(`<h1>Phonebook API</h1>`);
});

app.get('/api/info', (req, res) => {
    const numberOfPeople = persons.length;
    const time = new Date();
    res.send(`
    <p>Phonebook has info for ${numberOfPeople} people</p>
    <p>${time}</p>
    `);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.filter(p => p.id === id);
    if (person.length === 1) {
        res.status(200).json(person)
    } else {
        res.status(404).json({ message: 'Register not found' });
    }
});

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;
    const numberOfPersons = persons.length;
    const repeatedPerson = persons.filter(p => p.name.toLowerCase() === name.toLowerCase());
    const maxId = Math.max(...persons.map(p => p.id));
    const personObj = {
        name,
        number,
        id: maxId + 1
    };
    if (name && number) {
        if (repeatedPerson.length === 0) {
            persons = [...persons, personObj];
            if (persons.length > numberOfPersons) {
                res.status(200).json(personObj);
            } else {
                res.status(400).json({ message: "Can't register person" });
            }
        } else {
            res.status(400).json({ message: 'Name must be unique' });
        }

    } else {
        res.status(400).json({ message: "Name or number must be required" });
    }
});

app.put('/api/persons/:id', (req, res) => {
    const { name, number } = req.body;
    const id = Number(req.params.id);
    let [personObj] = persons.filter(p => p.id === id);
    if (personObj) {
        const newPersonsArray = persons.filter(p => p.id !== id);
        if (name && number) {
            personObj = { ...personObj, name, number };
            persons = [...newPersonsArray, personObj];
        } else if (name && !number) {
            personObj = { ...personObj, name };
            persons = [...newPersonsArray, personObj];

        } else if (!name && number) {
            personObj = { ...personObj, number };
            persons = [...newPersonsArray, personObj];

        } else {
            res.status(400).json({ message: 'Name or number must be valid' });
        }
        res.status(200).json(personObj);
    } else {
        res.status(404).json({ message: 'Register not found' })
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const deletedPerson = persons.filter(p => p.id === id);
    if (deletedPerson.length === 1) {
        persons = persons.filter(p => p.id !== id);
        res.status(200).json(deletedPerson);
    } else {
        res.status(404).json({ message: 'Register not found' });
    }

});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})