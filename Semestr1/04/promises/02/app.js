console.log('start app');

const helloPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello world');
    }, 5000);
});

helloPromise
    .then(text => {
        console.log(text);
    });

console.log('end app');
