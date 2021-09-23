const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const Person = require('./models/person');


// INITIALIZATIONS

const app = express();

const PORT = process.env.PORT || 3001;

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
    Person.find({}, (err, persons) => {
        if (err) {
            res.status(500).json({ message: 'Server error' });
        } else {
            res.json(persons);
        }
    })
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id, (err, person) => {
        if (err) {
            res.status(500).json({ message: 'Server error' });
        } else {
            if (person) {
                res.json(person);
            } else {
                res.status(404).json({ message: 'Register not found' });
            }
        }
    })
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
    const id = req.params.id;
    let personUpdated;
    if (name && number) {
        personUpdated = { name, number };
    } else if (name && !number) {
        personUpdated = { name };
    } else if (!name && number) {
        personUpdated = { number };
    } else {
        res.status(400).json({ message: "Name or/and number must be required" });
    }

    Person.findByIdAndUpdate(id, personUpdated, (err, person) => {
        if (err) {
            res.status(500).json({ message: 'Server error' });
        } else {
            if (person) {
                res.json(person);
            } else {
                res.status(404).json({ message: 'Register not found' });
            }
        }
    })

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