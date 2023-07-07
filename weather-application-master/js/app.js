const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js=city-name]')
const cityWeatherContainer = document.querySelector('[data-js=city-weather]')
const cityTemperatureContainer = document.querySelector('[data-js=city-temperature]')
const cityCard = document.querySelector('[data-js="city-card"]')
let timeImg = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

const showCityCard = () => {
    if (cityCard.classList.contains('d-none')) {
        cityCard.classList.remove('d-none')   
    }
}

const fetchCityWeatherInfo = async cityName => {
    const [{ Key, LocalizedName }] = await getCityData(cityName)
    const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key)

    return { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon }
}

const showCityWeatherInfo = async cityName => {
    const { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon } = 
        await fetchCityWeatherInfo(cityName)

    const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" />`
    timeImg.src = IsDayTime ? './src/day.svg' : './src/night.svg'
    timeIconContainer.innerHTML = timeIcon
    cityNameContainer.textContent = LocalizedName
    cityWeatherContainer.textContent = WeatherText
    cityTemperatureContainer.textContent = Temperature.Metric.Value

    showCityCard()
}

const showLocalStorageCity = () => {
    const city = localStorage.getItem('city')

    if (city) {
        showCityWeatherInfo(city)
    }
}

const handleCityForm = event => {
    event.preventDefault()

    const inputValue = event.target.city.value
    
    showCityWeatherInfo(inputValue)
    localStorage.setItem('city', inputValue)
    cityForm.reset()
}

cityForm.addEventListener('submit', handleCityForm)

showLocalStorageCity()


