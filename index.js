const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

// taskzo_admin dHuoHXX6NsiW76Rd





const uri = "mongodb+srv://taskzo_admin:<password>@cluster3.adrhe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster2.ic3nj.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send('Taskzo server is running')
  })
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })