## Zadania

1. Stworzenie aplikacji składającej się z 2 plików `app.js` oraz plików z `utils.js` w którym to zostanie zaimplementowana funkcja która zwraca nową tablicę bez zduplikowanych elementów.

Przykładowy kawałek kodu `app.js`:
```javascript
const utils = ...

const someArray = ['ala', 3, 'ma', 'kota', 2, 'ala', 5, 3];

const funcResult = utils.uniq(someArray);

console.log(funcResult);
```

Wynik:
```javascript
[ 'ala', 3, 'ma', 'kota', 2, 5 ]
```

2. Rozszerzenie poprzedniego zadania o nową funkcję która:
przyjmuje jako argument dwie tablice i zwraca elementy które są tylko w pierwszej tablicy.

Przykładowe dane wejściowe:
```javascript
const tabA = ['ala', 'ma', 'kota'];
const tabB = ['ala', 'ma', 'psa'];

console.log(utils.diff(tabA, tabB));
console.log(utils.diff(tabB, tabA));]
```

Wynik:
```javascript
['kota']
['psa']
```

3. Zmiana 2 zadania tak, by funkcje pochodziły nie z naszego modułu `utils` lecz z repozytorium `npm` (nazwa modułu `lodash`).

4. Znalezienie minimalnej oraz maksymalnej wartości w tablicy przy użyciu biblioteki `lodash` 

Przykładowe dane wejściowe:
```javascript
[3, 5, -20, -1002, 234, 542, 6, 23, -3, 8]
```

Wynik:
```
Max: 542
Min: -1002
```

5. Zainstalowanie globalnego modułu 'nodemon' (https://www.npmjs.com/package/nodemon), który umożliwia automatyczne restartowanie w przypadku wykrycia zmian w uruchomionych aplikacjach.
Aplikacja wyświetla w konsoli dowolny komunikat. Po zmianie kodu aplikacji (i zapisaniu zmian) powinna się ona automatycznie uruchomić ponownie.

6. Stworzenie kalkulatora który będzie pracował na danych wprowadzonych w prarametrach uruchamiania. Przy użyciu zewnętrznego modułu `yargs` (moduł odpowiedzialny za przetwarzanie parametrów wejściowych). 

Podstawowa dokumentacja: https://davidwalsh.name/nodejs-arguments-yargs

Zaawansowana dokumentacja: https://devhints.io/yargs oraz https://codezup.com/run-node-js-command-line-arguments-yargs-npm/

Przykładowy sposób uruchomienia:
```
> node app.js --a=5 --b=7 --operator=*
```

Konsola powinna zwrócić wynik operacji:

```
wynik: 35
```

7. Stworzenie aplikacji która pozwoli na zapisanie całego obiektu do pliku. Z wykorzystaniem funkcji pozwalającej na przekonwertowanie obiektu na postać tekstową (`JSON.stringify`).

Obiekt do zapisu:
```javascript
const user = {
    name: 'Jan',
    lastName: 'Nowak'
};
```
Wynik należy zapisać do pliku `user.json`.

8. Rozszerzenie aplikacji z zadania 7 o wprowadzanie danych które chcemy zapisać w parametrach uruchamiania. Do wykorzystania zewnętrzny moduł `yargs`.

Przykład uruchomienia aplikacji
```bash
node app.js --name=Adam --lastName=Mickiewicz
```

9. Program który wyświetla informacje o plikach i folderach w danej lokalizacji:
- użytkownik w parametrze podaje adres folderu (parametr wymagany) i rozmiar pliku (parametr opcjonalny)
- program wyświetla informacje o plikach w folderze: nazwa i wielkość:
    - jeżeli użytkownik poda w parametrze rozmiar pliku, to wyświetlamy listę plików, które są większe niż podany rozmiar
    - w przeciwnym wypadku, wyświetlamy listę plików których rozmiar jest większy niż średni rozmiar pliku w tym folderze

Pliki powinny być posortowane malejąco od największych do najmniejszych.

Podpowiedzi:
- zadanie można wykonać przy pomocy modułów które już wykorzystywaliśmy na zajęciach
- dozwolone jest użycie innych modułów dostępnych w `npm`
- dla ułatwienia możemy potraktować foldery jako pliki o rozmiarze 0
- nie trzeba robić tabelki jak na przykładzie ;)


```
Przykład:

folder zawiera takie pliki:
┌─────────────────────┬──────┐
│        name         │ size │
├─────────────────────┼──────┤
│      'app.js'       │ 974  │
│   'node_modules'    │  0   │
│ 'package-lock.json' │ 6598 │
│   'package.json'    │ 288  │
│     'user.json'     │  39  │
└─────────────────────┴──────┘

Przykładowe uruchomienie aplikacji:
> node app.js --directory==C:/code --size=200
Wynik działania aplikacji:
┌─────────────────────┬──────┐
│        name         │ size │
├─────────────────────┼──────┤
│ 'package-lock.json' │ 6598 │
│      'app.js'       │ 974  │
│   'package.json'    │ 288  │
└─────────────────────┴──────┘

Przykładowe uruchomienie aplikacji:
> node app.js --directory==C:/code
Wynik działania aplikacji:
mean file size: 1583.4
┌─────────────────────┬──────┐
│        name         │ size │
├─────────────────────┼──────┤
│ 'package-lock.json' │ 6598 │
└─────────────────────┴──────┘
```
