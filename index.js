const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dkuqjjn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        console.log('connect')
        const serviceCollection = client.db('wildLife').collection('services');
        const reviewCollection = client.db('wildLife').collection('reviews');

        // for services

        app.post("/services", async (req, res) => {
            const services = req.body;
            const results = await serviceCollection.insertOne(services);
            res.send(results);
        });

        app.get("/services-home", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query).limit(3).sort({ _id: -01 });
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/services', async (req, res) => {
            console.log(uri)
            const query = {}
            const cursor = serviceCollection.find(query).sort({ _id: -01 });
            const services = await cursor.toArray();
            res.send(services);

        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });



        //for reviews

        app.post("/reviews", async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });

        app.get("/reviews", async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email,
                };
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

    }
    finally {

    }
}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('wildlife sever is running')
})

app.listen(port, () => {
    console.log(`wildlife server running on ${port}`);
})