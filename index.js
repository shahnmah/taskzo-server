const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

// taskzo_admin dHuoHXX6NsiW76Rd

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster3.adrhe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const taskCollection = client.db('taskCollection').collection('task');

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

        // // api for update 
        // app.put('/task/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const data = req.body;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: {
        //             task: data.task
        //         },
        //     };
        //     const result = await taskCollection.updateOne(filter, updateDoc, options);
        //     res.send(result)
        // })


        // delete product using id
        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deleteItem = await taskCollection.deleteOne(query);
            res.send(deleteItem)
        })

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