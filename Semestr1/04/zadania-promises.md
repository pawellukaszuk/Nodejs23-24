## Zadania do wykonania w czasie ćwiczeń

## `Promise`

```javascript
const myCustomPromise = new Promise((resolve, reject) => {
    if (/* some logic ... */) {
        resolve('yay! it works');
    } else {
        reject('something went wrong');
    }
});

myCustomPromise
    .then(result => {
        console.log(result);
        return 'some other text';
    })
    .then(text => {
        console.log(text);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('this message show up when all promises will end');
    });
```

## `util.promisify`

https://nodejs.org/dist/latest-v16.x/docs/api/util.html#util_util_promisify_original

```javascript
const util = require('util');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

const data = 'ala ma kota';

writeFile('some-file.txt', data)
    .then(() => {
        console.log('file saved');
    })
    .catch((error) => {
        console.log('error saving file', error);
    });
```

## Przydatne linki

- https://javascript.info/promise-basics
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://developers.google.com/web/fundamentals/primers/promises
- https://exploringjs.com/es6/ch_promises.html
- https://medium.com/dailyjs/asynchronous-adventures-in-javascript-promises-1e0da27a3b4

## Zadania do wykonania w czasie ćwiczeń

1. Stworzeniem funkcji zwracającej `Promise` której rozwiązaniem ma być wartość `hello world`.

```javascript
const helloPromise = ... // <- implementacja Promise

helloPromise
    .then(text => {
        console.log(text);
    });
```

2. Modyfikacja zadania 1 tak, aby rozwiązanie `Promise` było asynchroniczne, z użyciem funkcji `setTimeout` z 5 sekundowym opóźnieniem.

3. Stworzenie funkcji odejmowania 2 liczb z wykorzystaniem `Promise`. Jeżeli wynik działania będzie ujemny `Promise` powinien zwrócić błąd, jeżeli wynik będzie dodatni `Promise` powinien się rozwiązać poprawnie przekazując wynik działania.

```javascript
const sub = (a, b) => {
    ... // <- implementacja Promise
}

sub(3, 4)
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    });
```

4. Pobranie danych użytkownika z adresu (https://jsonplaceholder.typicode.com/users/{id}) przy użyciu zewnętrznej biblioteki `request`. Należy przerobić wywołanie zapytania aby wykorzystywało `Promise`.

```javascript
const getUser = (id) => {
    ... // <- implementacja Promise
}

getUser(2)
    .then(...)
    .catch(...);
```

5. Dodanie do aplikacji z zadania 4 pobierania pogody dla naszego użytkownika. Analogicznie jak w zadaniu 4. 

Endpoint do pogody: https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat={lat}&lon={lng}

Zarys wywołania aplikacji: 

```javascript
...
const getWeather = (lat, lng) => ...

getUser(2)
    .then(user => {
        ...
        return getWeather(...)
    })
    .then(weather => ...)
    .catch(...);
```

6. Modyfikacja zadania 4 tak, aby pobrać kilku użytkowników w tej samej chwili wykorzystując `Promise.all()`. Wyświetlenie ich imion w konsoli. (id użytkowników: 2,5,7). Dodatkowo wyświetlenie informacji, że `Promise` został w pełni zakończony.

7. Dodanie do zadania 5 zapisu całego obiektu pogody do pliku wykorzystując wbudowany moduł `fs` i funkcję `writeFile`. Zadanie polega na odpowiednim dostosowaniu funkcji `writeFile` aby obsługiwała `Promise`. 

8. W zadaniu 7 zastąpmy moduł request `request` wraz z naszymi `Promise` użyciem biblioteki `axios`.

9. Zamieńmy również z zadania 8 opakowanie funkcji `writeFile` na wbudowany mechanizm w NodeJS zamieniający naszą funkcję zwrotną na `Promise`. W tym celu powinniśmy wykorzystać wbudowany moduł `util` i funkcję `util.promisify` ([dokumentacja](https://nodejs.org/dist/latest-v16.x/docs/api/util.html#util_util_promisify_original))

10. Stwórzmy aplikacje która pobierze informacje o użytkowniku oraz jego pierwszym na liście albumie i przypisanych do niego zdjęciach.
- Z pobranego użytkownika wyświetlmy na ekranie nazwę użytkownika. 
- Z pobranego albumu wyświetlmy liczbę wszystkich albumów oraz nazwę pierwszego z nich.
- Z pobranych zdjęć wyświetlmy wszystkie tytuły.

Lista adresów do API
- endpoint do użytkownika: https://jsonplaceholder.typicode.com/users/{userId}
- endpoint do albumów: https://jsonplaceholder.typicode.com/albums?userId={userId}
- endpoint do zdjęć: https://jsonplaceholder.typicode.com/photos?albumId={userId}

> Pamiętajmy również o tym aby obsłużyć błędy zapytania łapiąc występujący wyjątek (`.catch()`)

11. Dodajmy do zadania 10 zapis do pliku listy pobranych zdjęć. Plik powinniśmy nazwać zgodnie z nazwą albumu. Jeżeli nazwa albumu przekracza 10 znaków powinniśmy skrócić nazwę naszego pliku.
