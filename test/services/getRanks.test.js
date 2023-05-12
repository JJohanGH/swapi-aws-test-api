const { handler } = require('../../src/services/getRanks')

describe('Get Ranks', () => {
  test('It must return the status 200 and the character with a list', async () => {
    const event = {}

    const expectedResponse = {
      status: 200,
      body: expect.any(Array)
    }

    const response = await handler(event)

    expect(response).toMatchObject(expectedResponse)
  })
})