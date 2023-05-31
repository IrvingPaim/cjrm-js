const APIKey = '9bHlPGHfSFblFhYtdoSdS0ZP49DAamdx'
const baseUrl = 'http://dataservice.accuweather.com/'

const getCityUrl = cityName => 
    `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

// Função que retorna a URL necessária para a realização do request sobre os dados da cidade

const getWeatherUrl = ({ Key }) => 
    `${baseUrl}currentconditions/v1/${Key}?apikey=${APIKey}&language=pt-br`

// Função que retorna a URL necessária para a realização de um 2º request com os dados sobre o clima da cidade (1º request)

const fetchData = async url => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Não foi possível obter os dados')
        }

        return response.json()
    } catch ({ name, message }) {
        alert(`${name}: ${message}`)
    }
}

// Função genéria que realiza o request e retorna uma PROMISE com os dados da requisição

const getCityData = cityName => fetchData(getCityUrl(cityName))

// Função que retorna uma PROMISE com um array de objetos de cidades

const getCityWeather = async cityName => {
    const [cityData] = await getCityData(cityName)
    return fetchData(getWeatherUrl(cityData))
}

// Função que retorna uma PROMISE com as condições climáticas da cidade no index 0 do array de objetos

getCityWeather('Salvador').then(console.log)

// Invocação da função que retorna um array com o objeto contendo as condições climáticas da cidade passada por parâmetro

