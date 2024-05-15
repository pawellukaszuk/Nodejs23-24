// npm init
// npm install dotenv
// npm install mongodb 

require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.CONNECTION_STRING, { serverApi: ServerApiVersion.v1 });

async function main() {
    await client.connect();
    const database = client.db(process.env.DATABASE_NAME);

    console.log("\n################ TASKS: ################");
    const taskCollection = database.collection("tasks");
    
    console.log("\n################ GET ALL TASKS: ################");
    const task = await taskCollection.find().toArray();
    console.table(task);

    console.log("\n################ COUNT ALL TASKS: ################");
    const taskCount = await taskCollection.countDocuments();
    const taskEstimatedCount = await taskCollection.estimatedDocumentCount();
    console.log("count: " + taskCount + " estimated: " + taskEstimatedCount);

    console.log("\n################ GET TASKS WITH PAGING: ################");
    const asc = 1
    const desc = -2

    let pageNumber = 3;
    const documentsPerPage = 5;


    const completedTasks = await taskCollection.find({ isCompleted: true })
                                                .sort({ _id : -1 })
                                                .skip((pageNumber - 1) * documentsPerPage)
                                                .limit(documentsPerPage)
                                                .project({ _id: 0 }) // nie zwracamy w wynikach pola _id
                                                .toArray();
    console.table(completedTasks);

    const completedTasksCount = await taskCollection.countDocuments({ isCompleted: true });
    const totalPageNumber = Math.ceil(completedTasksCount / documentsPerPage);
    console.log("Page size: " + documentsPerPage + " page number: " + pageNumber);
    console.log("Total count of pages with documents fullfilling given query: " + totalPageNumber);

    // jak zwrócić klientowi informacje, że już nie ma więcej danych do pobrania? (gdy stosujemy nieskończony scroll zamiast pagowanie z numerami stron)
    // rozwiazanie nie jest idealne bo zwraca true dla ostatniej strony gdy liczba tasków jest podzielna przez rozmiar strony
    // ale pomimo tego to rozwiązanie jest mniej kosztowne niż każdorazowe sprawdzanie ile danych jest w bazie
    let isMoreDataAvailable = true;
    if (completedTasks.length < documentsPerPage) {
        isMoreDataAvailable = false;
    }

    console.log("\n################ USERS: ################");
    const usersCollection = database.collection("users");

    const insertResult = await usersCollection.insertMany([
        {
            firstName: "Jan",
            lastLastname: "Kowalski",
            email: "test@test.de",
            createdAt: new Date(), 
            updatedAt: null,
            isActive: true,
            deletedAt: null
        }
    ]);

    let allUsers = await usersCollection.find({ isActive: true}).toArray();
    console.table(allUsers);

    // soft delete
    await usersCollection.updateOne({ _id: allUsers[0]._id},
                                    { $set: { firstName: "deleted", lastName: "deleted", email: "deleted@deleted.deleted", isActive: false, deleteAt: new Date() } });
                                    
    allUsers = await usersCollection.find({ isActive: true}).toArray();
    console.table(allUsers);                                    
}

main()
  .then(console.log("db connection works fine"))
  .catch(console.error)
  .finally(() => client.close());
