// npm init
// npm install mongodb
// npm install dotenv

require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const connectionString = process.env.CONNECTION_STRING;

const client = new MongoClient(
    connectionString,
    { 
        serverApi: ServerApiVersion.v1
    });

async function main() {
    await client.connect();

    const database = client.db(process.env.DATABASE_NAME);
    const tasksCollection = database.collection("tasks");
    
    // pobieramy wszystkie dokumenty z kolekcji
    const tasks = await tasksCollection.find().toArray();
    console.table(tasks);

    // usuwamy jeden dokument z kolekcji
    const deleteResult = await tasksCollection.deleteOne();
    console.log(deleteResult);

    // dodajemy dokument do kolekcji
    const task = {
        name: "task from code",
        isCompleted: false,
        createdAt: new Date()
    }

    const insertResult = await tasksCollection.insertOne(task);
    console.log(insertResult);
    
    // pobieramy dodany dokument
    const id = insertResult.insertedId;
    const documentFromDatabase = await tasksCollection.findOne({ _id: id });
    console.log(documentFromDatabase);

    // pobieramy dokumenty z polem isCompleted == false
    const documentsFromDatabase = await tasksCollection.find({ isCompleted: false })
                                                        .toArray();
    console.table(documentsFromDatabase);

    // zmieniamy dokumenty z polem isCompleted == false
    const modifyResult = await tasksCollection.updateMany(
        { isCompleted: false }, // jakie dokumenty chcemy zmienić
        { $set: { isCompleted: true } }
    )
    console.table(modifyResult);

    // pobieramy dokument z określonym Id
    const documentId = new ObjectId("6622d9659bd6b101adab3c32");
    const document2FromDatabase = await tasksCollection.findOne({ _id: documentId });
    console.log(document2FromDatabase);

    console.log();
}

main()
  .then(console.log("db connection works fine"))
  .catch(console.error)
  .finally(() => client.close());
