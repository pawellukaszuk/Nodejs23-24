// wczytujemy moduł 'user' do stałej user;
// w takim przypadku stała będzie miała wartość 'Paweł' gdyż plik 'user.js' wyeksportował string o wartości 'Paweł'
const user = require('./user');

// inną opcją jest podanie pełnej nazwy wczytywanego modułu wraz z rozszerzeniem
// const user = require('./user.js');

// konsola zwróci: Hello Paweł
console.log('Hello ' + user);
