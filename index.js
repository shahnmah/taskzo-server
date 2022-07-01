const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster3.adrhe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const taskCollection = client.db('taskCollection').collection('task');
        const completedTaskCollection = client.db('completedTaskCollection').collection('completedTask');

        // get api for load all task
        app.get('/task', async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        });

        // add new task 
        app.post('/addTask', async (req, res) => {
            const data = req.body;
            const newTask = await taskCollection.insertOne(data)
            res.send(newTask)
        });

        // delete product using id
        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deleteItem = await taskCollection.deleteOne(query);
            res.send(deleteItem)
        })

          // completed task add  
          app.post('/completedTask', async (req, res) => {
            const data = req.body;
            const completedTask = await completedTaskCollection.insertOne(data)
            res.send(completedTask)
        });

         // get api for load all completed task
         app.get('/completedTasks', async (req, res) => {
            const query = {};
            const cursor = completedTaskCollection.find(query);
            const completedTasks = await cursor.toArray();
            res.send(completedTasks);
        });

    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Taskzo server is running')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})