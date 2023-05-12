const axios = require('axios')
const dictionary = require('../constants/dictionary/es')

const handler = async (event) => {
  try {
    const { page: pageParms } = event.queryStringParameters ?? {}
  
    const page = pageParms ? pageParms : 1
  
    const response = await axios.get('https://swapi.py4e.com/api/people/', {
      params: {
        page,
        format: 'json',
      },
    });
  
    const data = response.data
  
    const characters = data.results.map(objetoEnIngles =>
      Object.fromEntries(
        Object.entries(objetoEnIngles).map(([key, value]) => [dictionary.character[key], value])
      )
    )
  
    return {
      status: 200,
      body: {
        cantidad: data.count,
        pagina: page,
        personajes: characters
      }
    }
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

module.exports = { handler }