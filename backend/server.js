require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello World from the Blog API!');
});

app.use('/user', userRoute);
app.use('/post',postRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});