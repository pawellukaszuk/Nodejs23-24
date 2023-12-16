const axios = require('axios');
const fs = require('fs');

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
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(data), () => {
            resolve('file saved');
        });
    })
}

getUser(2)
    .then(user => {
        console.log(user.name);
        let x = getWeather(user.address.geo.lat, user.address.geo.lng);
        return x;
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
