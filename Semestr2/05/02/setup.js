const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

if (!process.env.CONNECTION_STRING || !process.env.DATABASE_NAME) {
    console.error("################ please rename file `sample.env` to `.env` and set up variables ################")
    process.exit(1);
}

const client = new MongoClient(process.env.CONNECTION_STRING, { serverApi: ServerApiVersion.v1 });

async function main() {
    await client.connect();
    console.log('Connected successfully to server');

    // wybieramy odpowiednią bazę danych 
    const db = client.db(process.env.DB_NAME);

    const collectionName = "tasks";
    
    // wybieramy odpowiednią kolekcję
    const taskCollection = db.collection(collectionName);

    // usuwamy kolekcję, jeżeli kolekcja nie istanieje to driver Mongo zwróci error, dlatego operacja została umieszczona w try
    try {
        const collectionDropResult = await taskCollection.drop();
        console.log(`Collection ${collectionName} deleted: ${collectionDropResult}`);
    } catch {
        console.log(`There are no collection ${collectionName} in db`);
    }

    // dodajemy dwa taski do kolekcji
    const task1 = {
        name: "task1", 
        isCompleted: true, 
        createdAt: new Date()
    }

    const task2 = {
        name: "task2", 
        isCompleted: false, 
        createdAt: new Date()
    }
    
    const insertManyResult = await taskCollection.insertMany([task1, task2]);
    console.log("\n################ Insert many result: ################");
    console.log(insertManyResult);

    return 'ok';
}

main()
  .then(message => console.log(message))
  .catch(error => console.log(error))
  .finally(() => client.close());
