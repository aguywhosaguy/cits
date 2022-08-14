const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aguywhosaguydoessecurestuff:yeaitotallydo@aguywhosaguys-projects.5hbldf7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const port = process.env.PORT || 3000;
    console.log("Port: " + port);
    const collection = client.db("roblox").collection("cits");
    console.log("Connected to MongoDB");
    app.post('/seckretcreateacc', (req, res) => {
        const { id, password } = req.query;
        if (password == "ialoveusomuch") {
            try {
                if (await collection.findOne({ id: id })) {
                    res.send("Account already exists");
                }
                collection.insertOne({ _id: id, checkpoint: 0, objects: [], time: 0 });
                res.send(id);
            } catch (err) {
                res.send("Invalid ID");
            }
        } else {
            res.send("Access Denied");
        }
    })
    app.get('/', (rep, res) => {
        res.send("Hello World");
    })
    app.get('/maybseretget', async (req, res) => {
        const { id, password } = req.query;
        if (password == "uhatiusomuch") {
            try { 
                const doc = await collection.findOne({ _id: id });
                res.send(doc);
            } catch (err) {
                res.send("Invalid ID");
            }
        } else {
            res.send("Access Denied");
        }
    })
    app.put('/ubasesertupday', async (req, res) => {
        let { id, password, checkpoint, objects, time } = req.query;
        objects = objects || '[]';
        const parsedobjects = JSON.parse(objects);
        if (password == "yuhatkinyasomuch") {
            try {
                let doc = await collection.findOne({ _id: id });
                checkpoint = checkpoint || doc.checkpoint;
                time = time || doc.time;
                let newobjects = doc.objects.concat(parsedobjects);
                let newarray = []
                for (let i = 0; i < newobjects.length; i++) {
                    console.log(newobjects[i])
                    console.log(newarray)
                    if (newarray.includes(newobjects[i]) == false) {
                        newarray.push(newobjects[i]);
                    }
                }
                await collection.updateOne({ _id: id }, { $set: { checkpoint: checkpoint, objects: newarray, time: time } });
                res.send("Updated");
            } catch (err) {
                res.send("Invalid ID");
            }
        } else {
            res.send("Access Denied");
        }
    })

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });


    //         collection.insertOne({ _id: id, checkpoint: 0, objects: [], time: 0 });
})


module.exports = app;
