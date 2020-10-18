const todoController = require('../../controllers/todo.controller')
const TodoModel = require('../../model/todo.model')
const httpsMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo.json.json')
const allTodos = require('../mock-data/all-todos.json')

TodoModel.create = jest.fn()
TodoModel.find = jest.fn()
TodoModel.findById = jest.fn()

let req, res, next

beforeEach(() => {
    req = httpsMocks.createRequest()
    res = httpsMocks.createResponse()
    next = jest.fn()
})

describe('', () => {

    describe('TodoController GET Todo', () => {
        it('Should have a getTodos function', () => {
            expect(typeof todoController.getTodos).toBe('function')
        })

        it('Should call TodoModel.find({})', async () => {
            await todoController.getTodos(req, res, next)
            expect(TodoModel.find).toHaveBeenCalledWith({})
        })

        it('Should return response with status 200 and all todos', async () => {
            TodoModel.find.mockReturnValue(allTodos)
            await todoController.getTodos(req, res, next)
            expect(res.statusCode).toBe(200)
            expect(res._isEndCalled()).toBeTruthy()
            expect(res._getJSONData()).toStrictEqual(allTodos)
        })

        it('Should handle errors', async function () {
            const errorMessage = {
                message: 'Error Finding'
            }
            const rejectedPromise = Promise.reject(errorMessage)
            TodoModel.find.mockReturnValue(rejectedPromise)
            await todoController.getTodos(req, res, next)
            expect(next).toHaveBeenCalledWith(errorMessage)
        });
    })

    describe('TodoController GET BY ID Todo', () => {
        it('Should have a getTodoById function', () => {
            expect(typeof todoController.getTodoById).toBe('function')
        })

        it('Should call TodoModel.find({id:}) with route parameters', async () => {
            req.params.todoId = "5f8ad67be5695a197574deb5"
            await todoController.getTodoById(req, res, next)
            expect(TodoModel.findById).toHaveBeenCalledWith("5f8ad67be5695a197574deb5")
        })
    })

    describe('TodoController POST Todo', () => {

        beforeEach(() => {
            req.body = newTodo
        })

        it('It todoController should be defined', () => {
            expect(todoController).toBeDefined()
        })

        it('It should have a createTodo Function', () => {
            expect(typeof todoController.createTodo).toBe('function')
        })

        it('Todo controller should received req, res and next', function () {
            todoController.createTodo(req, res, next)
            expect(TodoModel.create).toBeCalledWith(newTodo)
        });

        it('Should return 201 response code when everything it is ok', async function () {
            await todoController.createTodo(req, res, next)
            expect(res.statusCode).toBe(201)
            expect(res._isEndCalled()).toBeTruthy()
        });

        it('Should return JSON body in response when everything it is ok', async function () {
            TodoModel.create.mockReturnValue(newTodo)
            await todoController.createTodo(req, res, next)
            expect(res._getJSONData()).toStrictEqual(newTodo)
        });

        it('Should handle errors', async function () {
            const errorMessage = {
                message: 'Some properties required was not sent'
            }
            const rejectedPromise = Promise.reject(errorMessage)
            TodoModel.create.mockReturnValue(rejectedPromise)
            await todoController.createTodo(req, res, next)
            expect(next).toHaveBeenCalledWith(errorMessage)
        });
    })
})







