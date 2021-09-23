const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');


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

app.use(express.static('build'));

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

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
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

    if (name && number) {
        const person = new Person({
            name: name,
            number: number
        });

        person.save().then(savedPerson => {
            res.status(200).json(savedPerson.toJSON());
        })
    } else {
        res.status(400).json({ message: "Name or number must be required" })
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
    const id = req.params.id;
    if (id) {
        Person.findByIdAndDelete(id, (err, deletedPerson) => {
            if (err) {
                res.status(500).json({ message: 'Server error' });
            } else {
                if (deletedPerson) {
                    res.status(200).send(deletedPerson);
                } else {
                    res.status(404).json({ message: 'Register not found' });
                }
            }
        })
    } else {
        res.status(400).json({ message: 'Id must be valid' });
    }

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})