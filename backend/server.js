const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const postRoute = require("./routes/postRoute");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello World from the Blog API!');
});

app.use('/post',postRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});