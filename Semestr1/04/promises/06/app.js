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

const ids = [2, 5, 7];

const userPromises = ids.map(id => getUser(id));

Promise.all(userPromises)
    .then(users => {
        users.forEach(user => {
            console.log(user.name);
        });
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('Finished :)');
    });
