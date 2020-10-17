const request = require('supertest')
const app = require('../../app')
const endpointUrl = '/todos/'
const newTodo = require('../mock-data/new-todo.json.json')

describe(endpointUrl, () => {
    describe('GET TODO INTEGRATION', () => {
        it(`GET ${endpointUrl}`, async () => {
            const response = await request(app)
                .get(endpointUrl)
            expect(response.statusCode).toBe(200)
            expect(typeof response.body).toBe('array')
            expect(response.body[0].title).toBeDefined()
            expect(response.body[0].done).toBeDefined()
        })
    })

    describe('POST TODO INTEGRATION', () => {
        it(`POST ${endpointUrl}`, async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send(newTodo)

            expect(response.statusCode).toBe(201)
            expect(response.body.title).toBe(newTodo.title)
            expect(response.body.done).toBe(newTodo.done)
        })

        it(`Should return an error 500 on malformed data with POST ${endpointUrl}`, async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send({
                    title: "Make first unit test",
                })
            expect(response.statusCode).toBe(500)
            expect(response.body).toStrictEqual({
                message: 'Todo validation failed: done: Path `done` is required.'
            })
        })
    })
})
