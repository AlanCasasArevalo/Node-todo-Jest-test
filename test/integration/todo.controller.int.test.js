const request = require('supertest')
const app = require('../../app')
const endpointUrl = '/todos/'
const newTodo = require('../mock-data/new-todo.json.json')

let firsTodo, newTodoId

describe(endpointUrl, () => {
    describe('GET TODO INTEGRATION', () => {
        it(`GET ${endpointUrl}`, async () => {
            const response = await request(app)
                .get(endpointUrl)
            expect(response.statusCode).toBe(200)
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body[0].title).toBeDefined()
            expect(response.body[0].done).toBeDefined()
            firsTodo = response.body[0]
        })
    })

    describe('GET TODO BY ID INTEGRATION', () => {
        it(`GET BY ID ${endpointUrl}`, async () => {
            const response = await request(app)
                .get(endpointUrl + firsTodo._id)
            expect(response.statusCode).toBe(200)
            expect(response.body).toBeTruthy()
            expect(response.body.title).toEqual(firsTodo.title)
            expect(response.body.done).toEqual(firsTodo.done)
        })
        it(`GET BY ID ${endpointUrl} does not exist`, async () => {
            const response = await request(app)
                .get(endpointUrl + '/5a8aa67aa5695a197574aaa5')
            expect(response.statusCode).toBe(404)
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
            newTodoId = response.body._id
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

    describe('PUT TODO INTEGRATION', () => {
        it(`PUT ${endpointUrl}`, async () => {
            const todoTest = {
                title: "Make integration test for put",
                done: true
            }

            const response = await request(app)
                .put(endpointUrl + newTodoId)
                .send(todoTest)
            expect(response.statusCode).toBe(200)
            expect(response.body.title).toBe(todoTest.title)
            expect(response.body.done).toBe(todoTest.done)
        })

    })
})
