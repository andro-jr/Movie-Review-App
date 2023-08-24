const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('express-async-errors');
dotenv.config();
const PORT = 8000;
const userRouter = require('./routes/user');
const actorRouter = require('./routes/actor');
const movieRouter = require('./routes/movie');
require('./db');
const morgan = require('morgan');
const { handleNotFound } = require('./utils/helper');

const app = express();

app.use(cors());

// Api bata ako data lai json format ma lana ko lagi middeware
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user', userRouter);
app.use('/api/actor', actorRouter);
app.use('/api/movie', movieRouter);

app.use('/*', handleNotFound);

app.use((err, req, res, next) => {
  console.log('Error:', err);
  res.status(500).json({ error: err.message || err });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log('Hello darkness my old friend');
