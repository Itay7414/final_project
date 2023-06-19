const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mosacho1408:<password>@cluster0.7ygedx4.mongodb.net/<database_name>?retryWrites=true&w=majority';

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        return;
    }

    // Once connected, you can perform database operations here
    const db = client.db('Cluster0');
    // ...
});
