const axios = require('axios')

async function getCurrentWeatherByCityId(cityId) {
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
  const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&lang=ru&units=metric`)
  return res.data
}

module.exports = {
  getCurrentWeatherByCityId
}
