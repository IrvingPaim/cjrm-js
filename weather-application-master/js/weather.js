const APIKey = '9bHlPGHfSFblFhYtdoSdS0ZP49DAamdx'
const getCityUrl = cityName => 
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getCityData = async cityName => {
    try {
        const cityUrl = getCityUrl(cityName)
        const response = await fetch(cityUrl)

        if (!response.ok) {
            throw new Error('Não foi possível obter os dados')
        }

        const [cityData] = await response.json()
        return cityData
    } catch ({ name, message }) {
        alert(`${name}: ${message}`)
    }
}

getCityData('salvador')

const getCityWeather = async cityName => {
    try {
        const { Key } = await getCityData(cityName)
        const cityWeatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIKey}`
        const response = await fetch(cityWeatherUrl)

        if (!response.ok) {
            throw new Error('Não foi possível obter os dados')
        }

        const [cityWeatherData] = await response.json()
        console.log(cityWeatherData)
    } catch ({ name, message }) {
        alert(`${name}: ${message}`)
    }
}

getCityWeather('salvador')



