// wczytujemy moduł 'math'
const math = require('./math');

// wczytujemy wbudowany moduł 'fs'(file system) i przypisujemy jego wyeksportowane funkcje/zmienne do stałej 'fs'
const fs = require('fs');

// tworzymy zmienne które będą zawierały rezultaty wywołań funkcji z modułu 'math'

const resultAdd = '3 + 5 = ' + math.add(3, 5);
const resultSub = '4 - 7 = ' + math.sub(4, 7);
const resultMul = '6 * 2 = ' + math.mul(6, 2);
const resultDiv = '8 / 2 = ' + math.div(8, 2);

// wyświetlamy wszystkie wyniki wykonanych funkcji z modułu 'math'
console.log(resultAdd);
console.log(resultSub);
console.log(resultMul);
console.log(resultDiv);

// wywołujemy funkcję 'writeFileSync' z naszego modułu 'fs'
// pierwszy parametr funkcji to nazwa pliku, drugi zaś wartość którą chcemy zapisać
fs.writeFileSync('wynik.txt', resultAdd);

// funkcja appendFileSync pozwala na dodanie nowych danych do pliku bez jego czyszczenia
fs.appendFileSync('wynik.txt', resultSub);
// dla czytelności zapisanych wartości możemy dodać znak nowej linii (\n)
fs.appendFileSync('wynik.txt', resultMul + '\n');
fs.appendFileSync('wynik.txt', resultDiv + '\n');

// zamiast funkcji appendFileSync możemy użyć writeFileSync z odpowiednią flagą 
// fs.writeFileSync('wynik.txt', resultDiv, { flag: "a" });
