//const { default: axios } = require("axios")

async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  document.querySelector('#weatherWidget').style.display = 'none'
  document.querySelector('#citySelect').addEventListener('change', async event => {
    try {
      document.querySelector('#citySelect').setAttribute('disabled', 'disabled')
      document.querySelector('#weatherWidget').style.display = 'none'
      document.querySelector('.info').textContent = 'Fetching weather data...'
      let city = event.target.value
      let url = `http://localhost:3003/api/weather?city=${city}`

      const res = await axios.get(url)
     

      document.querySelector('#weatherWidget').style.display = 'block'
      document.querySelector('.info').textContent = ''
      event.target.removeAttribute('disabled')

      let { data } = res

      document.querySelector('#apparentTemp div:nth-child(2)').textContent = 
      `${data.current.apparent_temperature}°`
      document.querySelector('#todayDescription').textContent =
      descriptions.find(d => d[0] === data.current.weather_description)[1]
      document.querySelector('#todayStats div:nth-child(1)').textContent = 
      `${data.current.temperature_min}°/${data.current.temperature_max}°`
      document.querySelector('#todayStats div:nth-child(2)').textContent = 
      `Precipitation: ${data.current.precipitation_probability * 100}%`
      document.querySelector('#todayStats div:nth-child(3)').textContent = 
      `Humidity: ${data.current.humidity}%`
      document.querySelector('#todayStats div:nth-child(4)').textContent = 
      `Wind: ${data.current.wind_speed}m/s`

      data.forecast.daily.forEach((day, i) => {
        let card = document.querySelectorAll('.next-day')[i]

        let weekDay = card.children[0]
        let appT = card.children[1]
        let minMax = card.children[2]
        let precip = card.children[3]

        weekDay.textContent = getWeekDay(day.date)
        appT.textContent = descriptions.find(d => d[0] === day.weather_description)[1]
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
        precip.textContent = `Precipitation: ${day.precipitation_probability * 100}%`
      })

      document.querySelector('#location div:nth-child(1)').textContent = `${city}`
    }
    catch (err) {
      console.log('Promise rejected with an err.message -->', err.message)
    }

    function getWeekDay(dateString) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const date = new Date(dateString);
      const dayOfWeekIndex = date.getDay();
      const dayOfWeek = daysOfWeek[dayOfWeekIndex];
      return dayOfWeek;
    }

  })

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
