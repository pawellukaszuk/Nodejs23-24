# Node.js - Laboratorium 2

## using `middleware` https://expressjs.com/en/guide/using-middleware.html
## writing `middleware` https://expressjs.com/en/guide/writing-middleware.html


```javascript
const express = require('express');
const app = express();

const customMiddleware = (req, res, next) => {
    // some logic ...
    next(); //optional but used in most cases 
};

app.use(customMiddleware);

app.get('/', (req, res) => {
    // ...
});

app.listen(4700, console.log('server started'));
```
## Zadania do wykonania

1. Stwórzmy swoje pierwsze oprogramowanie pośredniczące (`middleware`). Zadaniem `middleware` będzie nasłuchiwanie wszystkich żądań do serwera i wyświetlenie w konsoli informacji na jaki adres użytkownik próbuje się dostać, jaką metodą HTTP oraz jakie parametry podał w query stringu.

2. Kolejnym zadaniem jest stworzenie `middleware`, które zabezpieczy naszą aplikację przed dostępem osób nieupoważnionych. Użytkownik powinien wysłać w nagłówku token, który go autoryzuje.
Przyjmijmy, że nazwa nagłówka to `authorization`, a wartość która wpuszcza nas do systemu to `alamakota`.

3. Zmodyfikujmy zadanie 2 tak aby nagłówek `authorization` składał się z użytkownika i hasła (wzór: `login:password`, np. `jan:alamakota`) oraz sprawdźmy czy w systemie jest taki użytkownik z takim hasłem.
Lista użytkowników niech będzie tablicą:
```javascript
const users = [{
    login: 'jan',
    password: 'alamakota',
    name: 'Jan',
}, {
    login: 'adam',
    password: 'cukierki',
    name: 'Adam',
}]
```

4. Zmodyfikujmy aplikację z zadania 3 tak, aby zwracała ona imię zalogowanego użytkownika np `Hello Adam`. Imię pobieramy z listy użytkowników.

5. Wykorzystując zewnętrzny `middleware` `body-parser` (https://www.npmjs.com/package/body-parser , funkcja `bodyParser.text()` ), odczytajmy zawartość żądania POST z body typu `text` i sprawdźmy, czy w przesłanym przez użytkownika tekście nie zostały umieszczone niedozwolone słowa. Jeżeli jakieś słowo ze słownika znajduje się w żądaniu, wyślijmy błąd do użytkownika końcowego (status błędu `400`). Jeżeli przesłany tekst jest 'bezpieczny' to zapiszmy go w pliku `data.txt`.

    Przykładowy słownik zakazanych słów: `['wino', 'hazard', 'cukierki']`. 

    Stwórzmy tutaj dodatkowo endpointy do
    - wyświetlania zawartości pliku z tekstem przesłanym przez użytkowników
    - wyświetlania listy zakazanych słów

6. Stwórzmy `middleware`, które sprawdzi czy podana ścieżka jest ścieżką do pliku na dysku (tutaj może być pomocny moduł `fs`). Jeżeli tak, to powinniśmy ten plik odesłać klientowi. Jeżeli nie możemy odnaleźć pliku, powinniśmy przesłać dalej wykonywanie naszego żądania i zwrócić stosowny komunikat. (Przyjmujemy, że szukamy plików tylko w folderze z kodem aplikacji.)

7. Spróbujmy osiągnąć taki sam rezultat korzystając z middleware Express `express.static`

8. Zmodyfikujmy zadanie 7 tak by middleware Express `express.static` zwracało pliki tylko z folderu `images`, folder ten powinien znajdować się w głównym folderze aplikacji.

9. Napiszmy middleware który loguje w konsoli czas odebrania żądania oraz czas wysłania odpowiedzi. Uwaga: czas wysłania odpowiedzi zalogujmy po jej wysłaniu!

10. Rozbudujmy aplikację z zadania 9 o zapisywanie logów do pliku - nowe logi powinny dopisywać się na końcu pliku.

11. Napiszmy aplikację która zwraca dane użytkownika pobrane z adresu `https://jsonplaceholder.typicode.com/users/{userId}`. UserId niech będzie pobierane z adresu naszego endpointu (np `http//localhost:4700/users/:userId`). W przypadku braku użytkownika lub problemów w komunikacji z serwerem rzućmy `Error`, który zostanie obsłużony w middleware. Middleware powinno zapisać do pliku czas wystąpienia błędu i zwrócić odpowiedź ze stosownym komunikatem.
