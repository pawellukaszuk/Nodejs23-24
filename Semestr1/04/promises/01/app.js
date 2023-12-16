console.log('start app');

const helloPromise = new Promise((resolve, reject) => {
    resolve('hello world');
});

helloPromise
    .then(text => {
        console.log(text);
    });

console.log('end app');
