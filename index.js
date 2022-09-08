const express = require('express')
const app = express()
const port = process.env.PORT || 8000
var cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');



// middel ware 
app.use(express.json());
app.use(cors())


// mongo cluster 
const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.u6gap.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {

    try {

        await client.connect()
        const collection = client.db('todo').collection('data');


        //    data get from client side
        app.get('/story', async (req, res) => {
            const result = await collection.find().toArray()
            res.send(result)
        })

    //    post method todos data collect from client side
       app.post('/send', async(req,res) => {
        const todosget = req.body;
        console.log(todosget)
        const todostore = await collection.insertOne(todosget);
        res.send(todostore)
       } )


        // put method for update data from client side
       app.put('/post/:id', async(req,res)=> {
        const data = req.body
        console.log(data)
        const id = req.params.id;
        console.log(id)
        const filter = {_id:ObjectId(id)};
        console.log(filter)
        const options = { upsert: true };
        const updateDoc = {
          $set: data
        };
        const storeindb = await collection.updateOne(filter, updateDoc, options)
        res.send(storeindb)
       } )


        // delete
        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) };
            const remove = await collection.deleteOne(filter)
            res.send(remove)
        })




    }

    finally {

    }

}

run().catch(console.dir);




// initial testing key 
app.get('/', (req, res) => {
    res.send('Hello World this vercel test ')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})