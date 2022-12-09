const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config()
// const uri = process.env.ATLAS_URI;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))

app.get('/', (req,res) => {
  res.json('API message')
})

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})