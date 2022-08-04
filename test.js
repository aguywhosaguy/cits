const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aguywhosaguydoessecurestuff:yeaitotallydo@aguywhosaguys-projects.5hbldf7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    if (err) {
        console.log("Error connecting to MongoDB");
    } else {
        console.log("Connected to MongoDB");
    }
})