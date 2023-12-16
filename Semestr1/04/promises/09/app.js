const axios = require('axios');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const getUser = (id) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    return axios.get(url)
        .then(response => response.data);
}

const getWeather = (lat, lng) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
    return axios.get(url)
        .then(response => response.data);
}

const saveFile = (filename, data) => {
    return writeFile(filename, JSON.stringify(data))
        .then(() => 'file saved');
}

getUser(2)
    .then(user => {
        console.log(user.name);
        return getWeather(user.address.geo.lat, user.address.geo.lng);
    })
    .then(weather => {
        console.log(weather.main.temp);
        return saveFile('pogoda.json', weather);
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
