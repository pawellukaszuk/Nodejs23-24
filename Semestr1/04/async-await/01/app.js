const myFunc1 = async () => {
    return 'hello world from async promise';
}

// jednoznaczne z tym zapisem:
const myFunc2 = () => {
    return new Promise((resolve, reject) => {
        resolve('hello world explicit promise');
    });
}

myFunc1()
    .then(result => {
        console.log(result);
    });

myFunc2()
    .then(result => {
        console.log(result);
    });    