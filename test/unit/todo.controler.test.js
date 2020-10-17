const todoController = require('../../controllers/todo.controller')
const TodoModel = require('../../model/todo.model')
const httpsMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo.json.json')

TodoModel.create = jest.fn()
let req, res, next

beforeEach(() => {
    req = httpsMocks.createRequest()
    res = httpsMocks.createResponse()
    next = null
})

describe('TodoController', () => {
    it('It todoController should be defined', () => {
        expect(todoController).toBeDefined()
    })

    it('It should have a createTodo Function', () => {
        expect(typeof todoController.createTodo).toBe('function')
    })

    it('Todo controller should received req, res and next', function () {
        req.body = newTodo
        todoController.createTodo(req, res, next)
        expect(TodoModel.create).toBeCalledWith(newTodo)
    });
})






