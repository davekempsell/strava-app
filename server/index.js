const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();

// setting up mongoose
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { dbName: 'workout-data', useNewUrlParser: true })
  .then(() => console.log('Connection to database successful'))
  .catch((error) => console.log(`Failed to connect to database. Error: ${error}`));

// use middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// routes
const workoutsRouter = require('./routes/workouts.route')

// use routes
app.use('/workouts', workoutsRouter)

const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
