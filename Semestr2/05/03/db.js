const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const TaskCollectionName = 'tasks';

let db;
let tasksCollection;

const init = () =>
    MongoClient.connect(process.env.CONNECTION_STRING, { serverApi: ServerApiVersion.v1 })
        .then((client) => {
            db = client.db(process.env.DATABASE_NAME);
            tasksCollection = db.collection(TaskCollectionName);
        })
        .catch(error => console.log(error));

const getTasks = () => {
    return tasksCollection.find().toArray();
}

const getTask = (id) => {
    return tasksCollection.findOne({ _id: new ObjectId(id) });
}

const deleteTask = (id) => {
    return tasksCollection.deleteOne({ _id: new ObjectId(id) });
}

const addTask = (newTask) => {
    newTask.createdTime = new Date();
    return tasksCollection.insertOne(newTask);
}

const updateTask = (id, isCompleted) => {
    return tasksCollection.updateOne(
        { _id: new ObjectId(id)},
        { $set: { "isCompleted": isCompleted } }
    );
}

module.exports = { init, getTasks, getTask, deleteTask, addTask, updateTask };
