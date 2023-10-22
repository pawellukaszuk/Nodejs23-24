// pobieramy pierwszy parametr przekazany do programu
// dla przypomnienia:
// process.argv[0] to adres pliku node.exe
// process.argv[1] to adres pliku któy uruchamiamy
// process.argv[2], process.argv[3] ... itd to parametry przekazywane przy uruchomieniu programu
const name = process.argv[2];

// ustawiamy odpowieni komunikat, w zależności od tego czy przy uruchomieniu programu podano parametr
let helloMessage;

if (name) {
    helloMessage = 'Hello ' + name;
} else {
    helloMessage = 'Hello world';
}

// wyświetlamy przywitanie w konsoli
console.log(helloMessage);
