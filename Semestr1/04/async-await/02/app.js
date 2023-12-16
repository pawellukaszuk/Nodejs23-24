const add = async (a, b) => {
    const result = a + b;
    if (result % 2 === 0) {
        throw new Error('liczba parzysta');
    }
    return result;
}

add(4, 7)
    .then(result => console.log("OK: " + result))
    .catch(error => console.log("Error: " + error.message));

add(2, 2)
    .then(result => console.log("OK: " + result))
    .catch(error => console.log("Error: " + error.message));
