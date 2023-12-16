const request = require('request');

const getUser = (id, callback) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const user = JSON.parse(body);
            callback(user);
        } else {
            console.log('User not found');
        }
    });
}

module.exports = getUser;