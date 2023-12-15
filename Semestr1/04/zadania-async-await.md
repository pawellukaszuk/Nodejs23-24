# Node.js - Laboratorium 4

## `Promise` z wykorzystaniem `async/await`
Konstrukcja bloku `async/await`

### `async`
```javascript
async function someFunction(someArg) {
    return ...; // ciało funkcji
}
```
lub
```javascript
const someFunction = async (someArg) => {
    return ...; // ciało funkcji
}
```

### `await`
```javascript
const someVar = await <Promise>;
```
> przykład wykorzystania
```javascript
const axios = require('axios');

// IIFE
(async function () {
    const response = await axios ('https://jsonplaceholder.typicode.com/users/1');
    console.log(response.data.name);
})();
```

## Przydatne linki
- https://javascript.info/async-await
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await

## Zadania do wykonania w czasie ćwiczeń

1. Wykorzystując składnię `async` stwórzmy funkcję zwracającą nasz pierwszy `Promise` i wyświetlmy na ekranie `hello world!`.
```javascript
// my func ... etc...

myFunc()
    .then(result => {
        console.log(result);
    });
```

2. Stwórzmy aplikację która będzie posiadała funkcję asynchroniczną (`async`) dodawania 2 liczb. Jeżeli wynik będzie liczbą parzystą powinniśmy wyrzucić wyjątek i poinformować użytkownika o tym fakcie.

```javascript
// my func ... etc...

add(4, 5)
    .then( ... )
    .catch( ... );
```

3. Zmodyfikujmy nasze zadanie 2 tak aby zamiast `.then..catch` użyć `await`.

4. Wykorzystując wiedzę z poprzednich zajęć użyjmy zewnętrznej biblioteki `axios` i pobierzmy użytkownika dane wykorzystując składnię `async/await`.

> Endpoint do użytkownika: https://jsonplaceholder.typicode.com/users/2

5. Dodajmy do naszego zadania 4 obsługę błędów `try..catch`.

6. Dodajmy do naszej aplikacji z zadania 5 pobieranie pogody dla naszego użytkownika (z odpowiedzi weźmy `main.temp` i wyświetlmy na ekranie). Zadanie analogiczne jak w poprzednim laboratorium z wykorzystaniem składni `async/await`.

> Endpoint do pogody: https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat={lat}&lon={lng}

7. Stwórzmy aplikację która pobierze informację o użytkowniku i statystykach jego postów i komentarzy.

- Z pobranego użytkownika wyświetlmy na ekranie nazwę użytkownika oraz email. 
- Pobierzmy wszystkie posty użytkownika i wyświetlmy ich ilość w konsoli.
- Dodatkowo sprawdźmy aktywność szukanego użytkownika w komentarzach i wyświetlmy łączną ilość komentarzy w konsoli.

> Endpoint do użytkownika: https://jsonplaceholder.typicode.com/users/2

> Endpoint do postów: https://jsonplaceholder.typicode.com/posts?userId=2

> Endpoint do komentarzy: https://jsonplaceholder.typicode.com/comments?postId=11
