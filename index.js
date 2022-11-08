const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.port || 5000;

// middle wares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('wildlife sever is running')
})

app.listen(port, () => {
    console.log(`wildlife server running on ${port}`);
})