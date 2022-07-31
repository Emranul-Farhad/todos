const express = require('express')
const app = express()
const port = process.env.PORT || 8000
var cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



// middel ware 
app.use(express.json());
app.use(cors())


// mongo cluster 
const uri =`mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.u6gap.mongodb.net/?retryWrites=true&w=majority` ;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




 async function run() {

   try{

    await client.connect()
    const collection = client.db('todo').collection('data');

   
    // get 
    app.get('/story', async(req,res)=> {
        const result = await collection.find().toArray()
        res.send(result)
    } )

    

    // delete
    app.delete('/delete/:id', async(req,res)=> {
        const id = req.params.id
        const filter = {_id:ObjectId(id)};
        const remove = await collection.deleteOne(filter)
        res.send(remove)
    } )
   



   }

   finally{

   }

 }

 run().catch(console.dir);

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('connected from here')
//   client.close();
// });




// initial testing key 
app.get('/', (req, res) => {
    res.send('Hello Worldt his is ')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})