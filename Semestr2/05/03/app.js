require('dotenv').config();
const status = require('http-status');
const express = require('express');
const app = express();

const { init, getTasks, getTask, deleteTask, addTask, updateTask } = require('./db');

app.use(express.json());

init().then(() => {
    app.get('/tasks', async (req, res) => {
        const tasks = await getTasks();
        res.send(tasks);
    });

    app.get('/tasks/:id', async (req, res) => {
        const { id } = req.params;
        const task = await getTask(id);

        if (task) {
            res.send(task);
        }
        else {
            res.statusCode = status.NOT_FOUND;
            res.send();
        }
    });

    app.post('/tasks', async (req, res) => {
        const newTask = req.body;
        
        // warto dodać sprawdzenie czy newTask posiada odpowiednie właściwości, gdy nie: to zwracać kod 400 bez dodawania do bazy
        const result = await addTask(newTask);
      
        if (result.insertedCount === 1) {
            res.statusCode = status.CREATED;
            res.send({ id: result. insertedId });
        } else {
            res.statusCode = status.INTERNAL_SERVER_ERROR;
            res.send();
        }
    });

    app.patch('/tasks/:id', async (req, res) => {
        const { id } = req.params;
        const modifiedTask = req.body;

        if (modifiedTask == null || modifiedTask.isCompleted == null) {
            res.statusCode = status.BAD_REQUEST;
        } else {
            const result = await updateTask(id, modifiedTask.isCompleted);

            if (result.modifiedCount === 1) {
                res.statusCode = status.NO_CONTENT;
            } else if (result.matchedCount === 1) {
                // sytuacja gdy znaleźliśmy taki obiekt w bazie ale nie wykonaliśmy aktualizacji bo nie wymaga zmian
                // można zwrócić 204 - obiekt ma takie wartości jak chcieliśmy
                // można zwrócić 409 - nie wykonano operacji bo obiekt nie wymaga zmian
                // w dokumentacji API należałoby opisać co dokładnie oznaczają statusy błędów w tej operacji
                res.statusCode = status.CONFLICT;
            } else {
                res.statusCode = status.NOT_FOUND;
            }
        }

        res.send();
    });

    app.delete('/tasks/:id', async (req, res) => {
        const { id } = req.params;
        const result = await deleteTask(id);

        if (result.deletedCount == 1){
            res.statusCode = status.NO_CONTENT;
        } else {
            res.statusCode = status.NOT_FOUND;
        }

        res.send();
    });
})
.finally(() => {
    app.get('/heartbeat', (req, res) => {
        res.send(new Date());
    });
    
    app.listen(process.env.PORT, () => console.log('server started'));
});
