const mongoose = require('mongoose');

// DB

const mongoInit = (password) => {

    const url = `mongodb+srv://root:${password}@cluster0.yqmj6.mongodb.net/phone-app?retryWrites=true&w=majority`;

    mongoose.connect(url);
}

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

// LOGIC

if (process.argv.length === 3) {

    const password = process.argv[2];

    mongoInit(password);

    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close();
    });

} else if (process.argv.length === 5) {

    const password = process.argv[2];
    const name = process.argv[3];
    const number = process.argv[4];

    mongoInit(password);

    const person = new Person({
        name,
        number
    });

    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });

} else {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}









