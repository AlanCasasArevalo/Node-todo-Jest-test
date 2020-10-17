const request = require('supertest')
const app = require('../../app')
const endpointUrl = '/todos/'
const newTodo = require('../mock-data/new-todo.json.json')

describe(endpointUrl, () => {
    test(`POST ${endpointUrl}`, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo)

        expect(response.statusCode).toBe(201)
        expect(response.body.title).toBe(newTodo.title)
        expect(response.body.done).toBe(newTodo.done)
    })
})