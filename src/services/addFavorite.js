const { v4 } = require('uuid')
const AWS = require('aws-sdk')
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
  
    const { url_del_personaje, puntaje, nota } = JSON.parse(event.body)

    const id = v4()
    const updatedAt = new Date().toJSON()

    if (puntaje < 1 || puntaje > 5) {
      return {
        status: 400,
        message: 'Puntaje no aceptado'
      }
    }

    const result = await dynamodb.scan({
      TableName: 'charactersTable',
      FilterExpression: 'people_url = :people_url',
      ExpressionAttributeValues: {
        ':people_url': url_del_personaje
      }
    }).promise()
  
    const character = result.Items.length > 0 ? result.Items[0] : {
      id,
      people_url: url_del_personaje,
      updatedAt
    }
  
    if (result.Items.length > 0) {
      await dynamodb.update({
        TableName: 'charactersTable',
        Key: { id: character.id },
        UpdateExpression: 'SET updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':updatedAt': updatedAt
        },
        ReturnValues: 'ALL_NEW'
      }).promise()
    } else {
      await dynamodb.put({
        TableName: 'charactersTable',
        Item: character
      }).promise()
    }
  
    const rating = {
      id: v4(),
      character_id: character.id,
      points: puntaje,
      note: nota,
      createdAt: updatedAt
    }
  
    await dynamodb.put({
      TableName: 'ratingsTable',
      Item: rating
    }).promise()
      
    return {
      status: 200,
      body: {
        ...character,
        updatedAt,
        ratings: [ rating ]
      }
    }
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

module.exports = { handler }