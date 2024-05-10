# Node.js - Laboratorium 4

## `MongoDB Node.JS Driver` (https://docs.mongodb.com/drivers/node/current/)

Moduł do komunikacji aplikacji Node.js z bazą danych MongoDB

Dokumentacja podstawowa: https://www.mongodb.com/docs/drivers/node/current/

Dokumentacja szczegółowa: https://mongodb.github.io/node-mongodb-native/5.1/

### stworzenie instancji klienta `MongoDB`
```javascript
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "connection_string";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function main() {
    await client.connect();
    //...
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
```

### dodanie nowego użytkownika do kolekcji
```javascript
    //...
    await client.connect();
    const usersCollection = client.db("mydatabase").collection("users");
    const addResult = await usersCollection.insertOne(
            { 
                firstName: "Jan",
                lastName: "Kowalski",
            },                
        );
    console.log(addResult);
    //...
```

### pobranie z kolekcji wszystkich użytkowników
```javascript
    //...
    await client.connect();
    const usersCollection = client.db("mydatabase").collection("users");

    const findResult = await usersCollection.find().toArray();
    console.table(findResult); 
    //...
```

### pobranie pierwszego użytkownika który posiada właściwość isActive = true
```javascript
    //...
    await client.connect();
    const usersCollection = client.db("mydatabase").collection("users");
    
    const findResult = await usersCollection.findOne({ isActive: true }).toArray();
    console.table(findResult);
    //...
```

### zmiana imion wszystkich użytkowników w kolekcji
```javascript
    //...
    await client.connect();
    const usersCollection = client.db("mydatabase").collection("users");
    
    const updateResult = await usersCollection.updateMany({}, { 
        $set: { firstName: 'Jan' } 
    });
    console.log(updateResult);
    //...
```

### usunięcie wszystkich użytkowników w kolekcji
```javascript
    //...
    await client.connect();
    const usersCollection = client.db("mydatabase").collection("users");
    
    const deleteResult = await usersCollection.deleteMany();
    console.log(deleteResult);
    //...
```

## Zadania do wykonania

1. Wykorzystując bazę danych MongoDB, stwórzmy aplikację która wykonuje operacje na użytkownikach:
- dodawanie
- pobieranie wszystkich
- pobieranie pojedynczego
- pobieranie na podstawie określonych kryteriów
- edycja
- usuwanie

    Dane dostępowe do bazy danych powinny być przechowywane w pliku `.env`.
