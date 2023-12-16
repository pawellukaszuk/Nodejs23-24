const sub = (a, b) => {
    const result = a - b;
    return new Promise((resolve, reject) => {
        if (result < 0) {
            reject('liczba mniejsza niż zero');
        } else {
            resolve(result);
        }
    });
}

sub(3, 4)
    .then(result => {
        console.log("OK: " + result)
    })
    .catch(error => {
        console.log("Error: " + error)
    });


sub(6, 4)
    .then(result => {
        console.log("OK: " + result)
    })
    .catch(error => {
        console.log("Error: " + error)
    });
