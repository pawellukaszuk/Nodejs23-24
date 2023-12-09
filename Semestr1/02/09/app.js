const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const yargs = require("yargs");

// konfiguracja yargs by wyświetlał ładne menu
const args = yargs(process.argv)
    .option("directory", {
        describe: "Path to directory",
        type: "string",
        demandOption: true,
    })
    .option("size", {
        describe: "Treshold for file size to display",
        type: "number",
    })
    .help().argv;

// jeżeli podano rozmiar pliku to sprawdzamy czy jest to liczba
// konfiguracja yargs `type: "number"` nie gwarantuje typu podanych danych
if (args.size != null && typeof args.size !== "number") {
    console.log("Wrong input type for argument size.");
    process.exit(1);
}

// pobieramy listę plików i folderów w podanym folderze
const files = fs.readdirSync(args.directory);
if (files.length === 0) {
    console.log("Empty folder.");
    process.exit(1);
}

// tworzymy kolekcję obiektów z nazwą i rozmiarem pliku
const filesDetails = files.flatMap((file) => {
    // pobieramy szczegóły pliku/folderu
    const fileStats = fs.statSync(path.join(args.directory, file));

    // sprawdzenie czy to plik czy folder
    if (!fileStats.isDirectory()) {
        return {
            name: file,
            size: fileStats.size,
        };
    }

    return [];
});

// wyznaczenie progu wyświetlania
const treshold = args.size ?? _.mean(filesDetails.map((f) => f.size));

// odfiltrowanie zbyt małych plików
const filteredFiles = filesDetails.filter((f) => f.size > treshold);

// posortowanie pozostałych plików
const result = _.orderBy(filteredFiles, "size", "desc");

console.log("List of files bigger than:", treshold);
console.table(result);
