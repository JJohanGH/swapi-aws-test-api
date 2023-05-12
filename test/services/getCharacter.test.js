const { handler } = require('../../src/services/getCharacter')

describe('Get Character', () => {
  test('Should return status 200 and character with character details.', async () => {
    const event = { pathParameters: { id: '584e139d-c711-46ba-a39c-d17542f0288c' } }

    const expectedResponse = {
      status: 200,
      body: expect.any(Object)
    }

    const response = await handler(event)

    expect(response).toMatchObject(expectedResponse)
  })

  test('It should throw an error if the list of characters cannot be obtained', () => {
    const event = {}
    expect(handler(event)).rejects.toThrow('Internal Server Error')
  });
})