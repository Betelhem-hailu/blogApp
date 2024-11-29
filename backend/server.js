require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const http = require("http");
const socketIo = require("socket.io");

const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const { setupComments } = require('./modules/comments');

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,              
  };
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust to match your frontend URL
    methods: ["GET", "POST"],
  },
});

setupComments(io);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello World from the Blog API!');
});

app.use('/user', userRoute);
app.use('/post', (req, res, next) => {
  req.io = io; // Attach io to the request object
  next(); // Proceed to the next middleware
}, postRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
io.listen(9000);