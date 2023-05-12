const { handler } = require('../../src/services/addFavorite')

describe('handler', () => {
  test('should return status 200 and the character with a new rating', async () => {
    const event = {
      body: JSON.stringify({
        url_del_personaje: 'https://swapi.py4e.com/api/people/1/',
        puntaje: 5,
        nota: 'Excelente personaje'
      })
    }

    const expectedResponse = {
      status: 200,
      body: {
        id: expect.any(String),
        people_url: 'https://swapi.py4e.com/api/people/1/',
        updatedAt: expect.any(String),
        ratings: [
          {
            id: expect.any(String),
            character_id: expect.any(String),
            points: 5,
            note: 'Excelente personaje',
            createdAt: expect.any(String)
          }
        ]
      }
    }

    const response = await handler(event)

    expect(response).toMatchObject(expectedResponse)
  })

  test('should return status 400 when puntaje is less than 1', async () => {
    const event = {
      body: JSON.stringify({
        url_del_personaje: 'https://swapi.py4e.com/api/people/1/',
        puntaje: 0,
        nota: 'No me gusta el personaje'
      })
    }

    const expectedResponse = {
      status: 400,
      message: 'Puntaje no aceptado'
    }

    const response = await handler(event)

    expect(response).toMatchObject(expectedResponse)
  })

  test('It should throw an error if the list of characters cannot be obtained', () => {
    const event = { body: {} }
    expect(handler(event)).rejects.toThrow('Internal Server Error')
  });
})
