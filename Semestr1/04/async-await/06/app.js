const axios = require('axios');

const getUser = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const response = await axios.get(url);
    return response.data;
}

const getWeather = async (lat, lng) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
    const response = await axios.get(url);
    return response.data;
}

(async () => {
    try {
        const user = await getUser(2);
        console.log(user.name);

        const { lat, lng } = user.address.geo;
        const weather = await getWeather(lat, lng);

        console.log(weather.main.temp);

    } catch (error) {
        console.log('user not found');
    }
})();
