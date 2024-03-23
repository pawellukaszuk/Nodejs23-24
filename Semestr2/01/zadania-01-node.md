# Node.js - Laboratorium 1

## Postman
Pełna dokumentacja (https://learning.postman.com/docs/getting-started/introduction/)

Najważniejsza część (https://learning.postman.com/docs/sending-requests/requests/)


## Wbudowany moduł `HTTP` (https://nodejs.org/dist/latest-v18.x/docs/api/http.html)

Node posiada wbudowany moduł pozwalający na obsługę protokołu http.
Moduł ten jest przeznaczony zarówno do wysyłania żądań po stronie klienta jak również do odbioru i przetwarzania żądań jako serwer.

Dla przykładu, aby wysłać żądanie do serwera po dane musimy wykorzystać funkcję `.get()` np.:

```javascript
const http = require('http');

http.get('http://localhost:4700', response => {
    console.log(response);
});
```

Konstrukcja bardzo podobna do zewnętrznego modułu `request` jaki wykorzystywaliśmy we wcześniejszych zajęciach.

Uruchomienie serwera z wbudowanego modułu `HTTP` wygląda następująco:
```javascript
const http = require('http');

// tworzymy nową instancję naszego serwera
const app = http.createServer((req, res) => {
    // zamykamy połączenie wysyłając tekst
    res.end('Hello world!');
});

// uruchamiamy nasz serwer na porcie 4700
app.listen(4700);
```

## Wbudowane API `URL` (https://javascript.info/url)

Pozwala na parsowanie adresu url na obiekt zawierający podział na protokół, adres, parametry wyszukiwania, itp..

```javascript
const url = new URL('http://localhost:4700/abc?q=some-string');
url.host // 'localhost:4700'
url.hostname // 'localhost'
url.href // 'http://localhost:4700/abc?q=some-string'
url.pathname // '/abc'
url.port // '4700'
url.searchParams // 'q 'some-string'
url.searchParams.get("q") // 'some-string'
url.searchParams.has('q'); // true
```

## Zadania do wykonania

0. Do wykonanych zadań przygotujmy kolekcję żądań w Postmanie tak by móc sprawdzić wszystkie obsługiwane ścieżki

1. Stwórzmy pierwszą aplikację serwerową wykorzystując wbudowany moduł `HTTP`, który wyśle do naszego klienta przywitanie. Sprawdźmy działanie poprzez uruchomienie przeglądarki i wysłanie żądania do naszego serwera (port 4700)

2. Dodajmy do zwracanej informacji kod statusu 200 oraz informację o typie zwracanej zawartości

3. Zmodyfikujmy naszą aplikację tak, by zwracała różny komunikat i status odpowiedzi w zależności od użytej metody http

4. Zmodyfikujmy naszą aplikację tak, by dla żądań pod adresem `http://localhost:4700/users` zwracała komunikat `Hello from Users path` a dla żądań pod adresem `http://localhost:4700/comments` zwracała komunikat `Hello from Comments path`

5. Dodajmy do aplikacji zwracanie parametru `name` podanego w url, np żądanie pod adres `http://localhost:4700?name=pawel` powinno zwrócić komunikat `Hello pawel`. Gdy nie podano wartości parametru aplikacja powinna zwrócić komunikat `Hello World`.

6. Stwórzmy aplikację która pobiera 2 parametry `a` i `b` z adresu url i wykona mnożenie w naszej aplikacji. Rezultat działania powinniśmy wysłać do użytkownika końcowego(klienta). 

```
http://localhost:4700?a=5&b=2 //wywołanie
10 //rezultat
```

7. Rozszerzmy naszą aplikację z zadania 6 o dodatkowe działania matematyczne takie jak mnożenie, dzielenie i odejmowanie. Podzielmy zadania na odpowiednie ścieżki.

```
/mnozenie...
/dzielenie...
/dodawanie...
/odejmowanie...
```

Gdy działanie jest niemożliwe do wykonania, aplikacja powinna zwracać odpowiedni komunikat oraz kod statusu `Bad Request`

8. Napiszmy aplikację która zwróci wszystkie parametry podane w url. Zwracany rezultat powinien być obiektem i mieć `'Content-type':'application/json'`

``` javascript
http://localhost:4700?a=5&b=2 //wywołanie
{'a':'1','b':'2'} //rezultat
http://localhost:4700?name=jan&lastname=kowalski //wywołanie
{'name':'jan','lastname':'kowalski'} //rezultat
```

9. Stwórzmy aplikację której zadaniem będzie operacja na tablicy zawierającej użytkowników

    - tablica niech będzie zdefiniowana na sztywno w kodzie, np:
    ``` javascript
        let users = [
            {
                name: "Jan",
                username: "Nowak",
                email: "jannowak@gmail.com",
                id: 1
            }
        ];
    ```
    - stwórzmy ścieżkę `/add` do dodawania użytkownika, niech przyjmuje ona parametry `name`, `username`, `email` np `?name=Jan&username=janko&email=jan@nowak.abc`, dodanie użytkownika powinno zadziałać tyko wtedy gdy zostało wysłane żądanie typu `POST`, jako rezultat należy zwrócić identyfikator dodanego użytkownika (sposób przydzielania identyfikatorów dowolny)
    - dodajmy ścieżkę `/show` do wyświetlania wszystkich użytkowników (gdy żądanie będzie typu `GET`)
    - rozbudujmy ścieżkę `/show` tak by wyświetlała jedynie wybranego użytkownika, jeżeli zostanie podany odpowiedni `id` (`/show?id=1`) oraz żądanie będzie typu `GET`, gdy nie ma użytkownika o danym id zwracamy odpowiedni kod statusu
    - rozszerzmy aplikację o kasowanie użytkownika poprzez ścieżkę `/delete?id=1`, gdy nie ma użytkownika o danym id zwracamy odpowiedni kod statusu
