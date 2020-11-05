const axios = require('axios')
const { CronJob } = require('cron')
const { toEmoji } = require('number-to-emoji');
const { getSnowLevel } = require('./services/rp5')
const { getCurrentWeatherByCityId } = require('./services/openweathermap')

require('dotenv').config()

const TOKEN = process.env.TOKEN
const CHAT_ID = process.env.CHAT_ID
const WEATHER_URL = process.env.WEATHER_URL;
const CITY_ID = process.env.CITY_ID;
const SYNC_AT = process.env.SYNC_AT;

async function informChat () {
  try {
    const snowLevel = await getSnowLevel(WEATHER_URL)
    const { weather, main: { temp }} = await getCurrentWeatherByCityId(CITY_ID)
    const text =`${toEmoji(snowLevel)} сантиметра(-ов) ❄️❄️ \nСейчас ${weather[0].description}, ${Math.round(temp)} ℃`
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`)
  } catch (e) {
    console.error(e)
  }
}

const job = new CronJob(`0 0 ${SYNC_AT} * * *`, informChat, null, true, 'Asia/Krasnoyarsk');

job.start();


