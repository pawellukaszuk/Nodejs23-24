# Node.js - Laboratorium 5

## REST API (https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md)

## mongoose (https://mongoosejs.com/)
```javascript
// npm install mongoose
// pracując z mongoose nie instalujemy pakietu npm mongodb!
const mongoose = require('mongoose');

// tworzymy schemat dokumentu
const CatSchema = new mongoose.Schema({
    name: String
});

async function main() {
	// łączymy się z bazą danych
	await mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });

	// łączymy schemat dokumentu z kolekcją Cat
	const Cat = mongoose.model('Cat', CatSchema);

	// tworzymy nowego `kota`
	const kitty = new Cat({ name: 'Zildjian' });

	// zapisujemy `kota` w bazie danych`
	await kitty.save();
}

main().catch(err => console.log(err));
```

## Zadania do wykonania

1. REST - Projekt przykładowego API 

	Mamy następujące zasoby: 
	- Student, Szkoła, Kurs, Wykład
	- Student i Szkoła mogą istnieć jako niezależne byty
	- Reszta zasobów jest powiązana z zasobami głównymi

	Zaprojektujmy REST API które umożliwi:
	- Pełnego CRUD’a dla Studentów i Szkoły
	- Dodawanie kursów do szkoły 
	- Listowanie kursów w danej szkole, z wyszukiwaniem po nazwie i roku startu
	- Dodawania wykładów do kursów
	- Listowanie wykładów w ramach kursu w danej szkole
	- Zapisywanie studentów na kurs w danej szkole

	Rozwiązaniem zadania jest lista adresów i method HTTP odpowiedzialnych za poszczególne funkcje.

	Przykład rozwiązania:
	``` JavaScript
		//dodawanie studenta CREATE
			POST /students
		
		//pobieranie wszystkich studentów READ
			GET /students
	```

2. Wykorzystując bazę danych MongoDB oraz serwer Express stwórzmy aplikację która udostępni endpointy:
	- `/tasks` który zwróci wszystkie dokumenty z kolekcji `tasks`
	- `/heartbeat` który zwróci aktualną datę i czas

3. Wykorzystując bazę danych MongoDB, stwórzmy aplikację typu lista zadań (`todo list`), wykonaną w podejściu `REST API`.
Aplikacja powinna pozwalać na:
	- dodanie nowego dokumentu do naszej bazy w postaci:
	```JSON
	{
		"task": "naprawić samochód",
		"description": "coś stuka po lewej",
		"isCompleted": false,
		"createdTime": "05-05-2022"
	}
	```
	- zmodyfikowanie zadania - poprzez określenie czy dane zadanie zostało wykonane
	```JSON
	{
		"isCompleted": true
	}
	```

	- usunięcie zadania
	- pobranie wszystkich zadań
	- pobranie pojedynczego zadania

	Pamiętajmy o zwracaniu poprawnych kodów odpowiedzi - dla ułatwienia skorzystajmy z pakietu `http-status` (https://www.npmjs.com/package/http-status).

4. Wykorzystując bazę danych MongoDB, stwórzmy aplikację typu lista zadań (`todo list`), zamiast wcześniej użytego zwykłego klienta `mongodb` wykorzystajmy bibliotekę `mongoose`. Aplikacja powinna pozwalać na wykonywanie operacji na dokumentach postaci:
	```JSON
	{
		"name": "Nazwa zadania",
		"description": "Opis zadania",
		"completed": true,
		"value": 20,
		"createdTime": ...
	}
	