const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
//middleware

app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://zahid:WLJsDodUOgnwC3NR@cluster0.oykwxyb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    //db collection
    const allAssignmentsCollection = await client.db("online-assignment").collection("allAssignmentCollection");

    //add new assignments
    app.post('/api/v1/addnewassignments',  async (req, res) => {
      const newAssignments = req.body
      console.log(newAssignments)
      const result = await allAssignmentsCollection.insertOne(newAssignments)
      res.send(result)
    })

    //get all assignments

    app.get('/api/v1/allassignments', async (req, res) => {
      const cursor = allAssignmentsCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    //view single assignment
    app.get('/api/v1/allassignments/:id', async (req, res) => {
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await allAssignmentsCollection.findOne(query)
      res.send(result)
    })
    
   

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("online assignmwentserver issssss running");
});

app.listen(port, () => {
  console.log(`online assignmwent server is listening on: ${port}`);
});
