const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.port || 5000;

// middle wares
app.use(cors());
app.use(express.json());


console.log(process.env.DB_USER)

const uri = "mongodb+srv://<username>:<password>@cluster0.dkuqjjn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('wildlife sever is running')
})

app.listen(port, () => {
    console.log(`wildlife server running on ${port}`);
})