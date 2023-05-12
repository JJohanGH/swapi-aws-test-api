const AWS = require('aws-sdk')
const axios = require('axios')
const dictionary = require('../constants/dictionary/es')
const dotenv = require('dotenv')

dotenv.config()

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY_ID, AWS_REGION } = process.env

const handler = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY_ID
      }
    })
  
    const { id } = event.pathParameters ?? {}
  
    const getCharacter = await dynamodb.get({
      TableName: 'charactersTable',
      Key: {
        'id': id
      }
    }).promise()
  
    const character = getCharacter.Item
  
    if (!character) {
      return {
        status: 400,
        message: 'Personaje no encontrado'
      }
    }
    
    const getRatings = await dynamodb.scan({
      TableName: 'ratingsTable',
      FilterExpression: 'character_id = :characterId',
      ExpressionAttributeValues: {
        ':characterId': character.id
      }
    }).promise()
  
    const ratings = getRatings.Items.map((e) => ({
      id: e.id,
      puntaje: e.points ?? 1,
      nota: e.note,
      fecha_de_crecion: e.createdAt
    }))
  
    const points = (ratings.reduce((sum, item) => sum + item.puntaje, 0) / ratings.length) ?? 0
    const getCharacterEn = await axios.get(character.people_url, {
      params: {
        format: 'json',
      },
    })
  
    const characterDataEn = getCharacterEn.data
  
    const characterData = Object.fromEntries(
      Object.entries(characterDataEn).map(([key, value]) => [dictionary.character[key], value])
    )
  
    return {
      status: 200,
      body: {
        id: character.id,
        ...characterData,
        puntajes: points ? points : 0,
        valoraciones: ratings
      }
    }
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

module.exports = { handler }