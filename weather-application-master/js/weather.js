const APIKey = '9bHlPGHfSFblFhYtdoSdS0ZP49DAamdx'
const baseUrl = 'http://dataservice.accuweather.com/'

const getCityUrl = cityName => 
    `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

// Função que retorna a URL necessária para a realização do request sobre os dados da cidade

const getWeatherUrl = cityKey => 
    `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`

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

const getCityWeather = cityKey => fetchData(getWeatherUrl(cityKey))


// Função que retorna uma PROMISE com as chave da cidade





