const request = require('request');

const getUser = (id) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const user = JSON.parse(body);
                resolve(user);
            } else {
                reject('User not found');
            }
        });
    });
}

getUser(2)
    .then(user => {
        console.log(user.name);
    })
    .catch(error => {
        console.log(error);
    });
