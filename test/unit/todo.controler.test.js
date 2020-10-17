const todoController = require('../../controllers/todo.controller')
const TodoModel = require('../../model/todo.model')

TodoModel.create = jest.fn()

describe('TodoController', () => {
    it('It todoController should be defined', () => {
        expect(todoController).toBeDefined()
    })

    it('It should have a createTodo Function', () => {
        expect(typeof todoController.createTodo).toBe('function')
    })

    it('should call TodoModel.create', function () {
        todoController.createTodo()
        expect(TodoModel.create).toBeCalled()
    });
})

