const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express();

// use middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// routes
const workouts = require('./routes/workouts')

// use routes
app.use(workouts)

const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
