import express from "express";
import 'dotenv/config'
import bodyParser from "body-parser";
import { MongoClient } from 'mongodb'
import cors from "cors";


const port = process.env.PORT || 5000;

const app = express();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbname = 'passop';

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());

app.get("/",async(req, res) => {
    await client.connect();
    console.log('Connected successfully to server');
  const db = client.db(dbname);
  const collection = db.collection('documents');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});


app.post("/post",async(req, res) => {
    await client.connect();
    console.log('Connected successfully to server');
    const password = req.body;
  const db = client.db(dbname);
  const collection = db.collection('documents');
  const findResult = await collection.insertOne(password);
  res.json({sucess:true});
});

app.delete("/del",async(req,res)=>{
  await client.connect();
    console.log('Connected successfully to server');
    const password = req.body;
  const db = client.db(dbname);
  const collection = db.collection('documents');
  const findResult = await collection.deleteOne(password);
  res.json({sucess:true,result:findResult});
});


  

app.listen(port, () => {
  console.log("Server running at port", port);
});
