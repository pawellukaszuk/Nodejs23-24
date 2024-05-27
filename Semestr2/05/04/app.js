// npm i dotenv
// npm i mongoose
// gdy korzystamy z mongoose nie ma potrzeby instalowania pakietu npm mongo

require('dotenv').config();
const mongoose = require('mongoose');

// definicja schematu kolekcji bazodanowej
const TaskSchema = new mongoose.Schema({
    name: String,
    description: String,
    isCompleted: {
        type: Boolean,
        default: false  // wartość domyślna
    },
    createdTime: {
        type: Date,
        default: new Date // wartość domyślna
    },
    value:  {
        type: Number,
        // walidacja
        min: 10,
        max: [100, 'must be max 100'], // własny komunikat błędu
        required: true
    }
},
{ timestamps: true } // automatyczne dodawanie właściwości z czasem utworzenia i modyfikacji dokumentu w bazie
);

// middleware/hook wykonywany przed zapisem dokumentu
TaskSchema.pre('save', function() {
    console.log("task is going to be saved at: " + new Date().toISOString());
});

// middleware/hook wykonywany po zapisie dokumentu
TaskSchema.post('save', function() {
    console.log("task saved at: " + new Date().toISOString());
});

// tworzenie modelu danych dla konkretnej kolekcji na podstawie uprzednio stworzonego schematu
const collectionName = 'mongooseTasks'; // nazwa kolekcji w bazie danych
const TaskModel = mongoose.model(collectionName, TaskSchema); 

async function main() {
    // łączymy się z bazą danych
    await mongoose.connect(process.env.CONNECTION_STRING, { dbName: process.env.DATABASE_NAME }); // wybór bazy danych
    
    const newTask = new TaskModel
    ({
        name: "my new mongoose task 2",
        description: "task description 2",
        value: 100
    })

    await newTask.validate(); // ręczne wywołanie validacji

    let result = await newTask.save(); // zapis do bazy nowego dokumentu
    console.log(`task saved with id ${result._id}`);

    // przykład mechanizmu trackingu zmian
    // mongoose jest w stanie skojarzyć nasz obiekt w kodzie z dokumentem w bazie danych (bo sam zapisał ten dokument)
    // dzięki temu możemy edytować pola obiektu i zapisywać je w bazie za pomocą funkcji save()
    newTask.isCompleted = true;
    result = await newTask.save(); // aktualizacja wcześniej zapisanego dokumentu
    console.log(`task updated at: ${result.updatedAt}`);

    const tasks = await TaskModel.find(); // pobranie wszystkich dokumentów z kolekcji
    for await (const task of tasks) {
        console.log(task);    
        // tracking działa też dla dokumentów które istniały już bazie, a nasz kod jedynie je pobrał
        task.name = task.name + " updated";
        await task.save();
    };

    // możemy też korzystać z zawansowanego pobierania danych
    const filteredTasks = await TaskModel.find({ isCompleted: true })   // zwróć tylko dokumenty z isCompleted = true
                                            .sort({ createdAt: 1 }) // posortuj je rosnąco po dacie utworzenia
                                            .limit(1)   // wybierz pierwszy z nich
                                            .select({ name: 1, description: 1, createdAt: 1 }); // zwróć tylko 3 wybrane pola (oraz _id)
    console.log(`oldest completed task is: ${filteredTasks}`);

    // aktualizacja dokumentów w bazie, uwaga: w mongoose nie używamy z operatora $set
    await TaskModel.updateMany({ isCompleted: true }, { isCompleted: false });

    // ta aktualizacja się nie powiedzie bo próbujemy zmodyfikować pole, którego nie ma w schemacie
    await TaskModel.updateMany({ }, { this_field_does_not_exists: false });
    

    await TaskModel.deleteMany({ completed: "true" }); // usunięcie z bazy wszystkich dokumentów z właściwością completed = true

    await mongoose.connection.close(); // zamknięcie połączenia z bazą danych
}

main()
    .catch(err => console.log(err));
