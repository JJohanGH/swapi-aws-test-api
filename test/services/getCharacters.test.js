const { handler } = require('../../src/services/getCharacters')

describe('Get Characters', () => {
  test('The list of characters should return', async () => {
    const event = { queryStringParameters: { page: 1 } }
    const response = await handler(event)
    expect(response.status).toBe(200)
    expect(response.body.cantidad).toBeGreaterThan(0)
    expect(response.body.personajes.length).toBeGreaterThan(0)
  })

  test('It should throw an error if the list of characters cannot be obtained', () => {
    const event = { queryStringParameters: { page: 'texto' } }
    expect(handler(event)).rejects.toThrow('Internal Server Error')
  })
})