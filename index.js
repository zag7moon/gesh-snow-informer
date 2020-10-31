const axios = require('axios')
const cron = require('node-cron')
const { toEmoji } = require('number-to-emoji');
const { getSnowLevel } = require('./services/rp5')
const { getCurrentWeatherByCityId } = require('./services/openweathermap')

require('dotenv').config()

const TOKEN = process.env.TOKEN
const CHAT_ID = process.env.CHAT_ID
const WEATHER_URL = process.env.WEATHER_URL;
const CITY_ID = process.env.CITY_ID;

async function informChat () {
  try {
    const snowLevel = await getSnowLevel(WEATHER_URL)
    const { weather, main: { temp, temp_min, temp_max }} = await getCurrentWeatherByCityId(CITY_ID)
    const text =`${toEmoji(snowLevel)} сантиметра ❄️❄️ \nСейчас ${weather[0].description}, ${Math.round(temp)} ℃ \nСегодня от ${Math.round(temp_min)} ℃ до ${Math.round(temp_max)} ℃`
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`)
  } catch (e) {
    console.error(e)
  }
}

cron.schedule('* * * * *', informChat)



