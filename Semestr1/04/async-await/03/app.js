const add = async (a, b) => {
    const result = a + b;
    if (result % 2 === 0) {
        throw new Error('liczba parzysta');
    }
    return result;
}

(async () => {
    try {
        const result = await add(4, 7);
        console.log("OK: " + result);
    }
    catch (error) {
        console.log("Error: " + error.message);
    }

    // wywołanie z innymi danymi
    try {
        const result = await add(2, 2);
        console.log("OK: " + result);
    }
    catch (error) {
        console.log("Error: " + error.message);
    }
})();
