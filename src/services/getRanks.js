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
  
    const getRanks = await dynamodb.scan({
      TableName: 'charactersTable'
    }).promise()
  
    const ranks = getRanks.Items
  
    const characters = await Promise.all(ranks.map(async (rank) => {
      const getCharacterEn = await axios.get(rank.people_url, {
        params: {
          format: 'json',
        },
      })
      const characterDataEn = getCharacterEn.data
  
      const characterData = Object.fromEntries(
        Object.entries(characterDataEn).map(([key, value]) => [dictionary.character[key], value])
      )
  
      const getRatings = await dynamodb.scan({
        TableName: 'ratingsTable',
        FilterExpression: 'character_id = :characterId',
        ExpressionAttributeValues: {
          ':characterId': rank.id
        }
      }).promise()
      
      const ratings = getRatings.Items.map((e) => ({
        id: e.id,
        puntaje: e.points ?? 1,
        nota: e.note,
        fecha_de_crecion: e.createdAt
      }))
      const points = ratings.reduce((sum, item) => sum + item.puntaje, 0) / ratings.length
  
      return {
        id: rank.id,
        ...characterData,
        puntajes: points ? points : 0,
        valoraciones: ratings,
        updatedAt: rank.updatedAt
      }
    }))
  
    
    const charactersInOrder = characters.sort((a, b) => {
      if (a.puntajes > b.puntajes) {
        return -1;
      } else if (a.puntajes < b.puntajes) {
        return 1;
      } else {
        if (a.updatedAt > b.updatedAt) {
          return -1;
        } else if (a.updatedAt < b.updatedAt) {
          return 1;
        } else {
          return 0;
        }
      }
    })
  
    return {
      status: 200,
      body: charactersInOrder
    }
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

module.exports = { handler }