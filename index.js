const express = require('express')
const app = express()
const MongoClient = require("mongodb").MongoClient;

app.use(express.urlencoded({extended: true}));
app.use(express.json()) ;
const port = 5000;

const uri = "mongodb+srv://naturalUser:sirus4213@cluster0.hvcun.mongodb.net/naturaldb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
client.connect(err => {
  console.log(err);
  const productCollection = client.db("naturaldb").collection("products");
  app.get('/products',(req,res)=>{
    productCollection.find({})
    .toArray( (err, documents) =>{
      res.send(document);
    })

  });
  app.post("/addProduct", function (req, res) {
    const product =req.body;
    productCollection.insertOne(product)
    .then(result=>{
      res.send(result.insertedCount >0);

    })
  
    
  })

 

  
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})