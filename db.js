const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net/<database_name>?retryWrites=true&w=majority;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        return;
    }

    const db = client.db('Cluster0');
    console.log('Connected to the database');
    // Export the database instance to be used in other modules
    module.exports = db;
});


const mongoose = require('mongoose');
const uri = 'mongodb+srv://mosacho1408:<password>@cluster0.7ygedx4.mongodb.net/<database_name>?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Failed to connect to the database:', err));

