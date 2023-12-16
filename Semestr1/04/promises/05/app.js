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

const getWeather = (lat, lng) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                resolve(data);
            } else {
                reject('Weather not found');
            }
        });
    });
}

getUser(2)
    .then(user => {
        console.log(user.name);
        return getWeather(user.address.geo.lat, user.address.geo.lng);
    })
    .then(weather => {
        console.log(weather.main.temp);
    })
    .catch(error => {
        console.log(error);
    });
