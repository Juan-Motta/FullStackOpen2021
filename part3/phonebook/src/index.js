const express = require('express');

// INITIALIZATIONS

const app = express();
app.use(express.json());

const PORT = 3001;

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