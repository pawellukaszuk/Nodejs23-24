// node app.js --id=3
const request = require('request');
const argv = require('yargs').argv;

const userId = argv.id;

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

const getWeather = (lat, lng, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            callback(data);
        } else {
            console.log('Weather not found');
        }
    });
}

getUser(userId, (user) => {
    console.log(user.name);
    console.log('lat', user.address.geo.lat);
    console.log('lng', user.address.geo.lng);
    getWeather(user.address.geo.lat, user.address.geo.lng, (weather) => {
        console.log(weather.main.temp);
    });
});
