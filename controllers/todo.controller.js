const TodoModel = require("../model/todo.model");

const createTodo = async (req, res, next) => {
    const body = req.body
    try {
        const createModel = await TodoModel.create(body)
        res.status(201).json(createModel)
    } catch (error) {
        next(error)
    }
}

const getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find({})
        res.status(200).json(allTodos)
    } catch (error) {
        next(error)
    }
}

const getTodoById = async (req, res, next) => {
    const id = req.params.todoId
    TodoModel.findById(id)
}

module.exports = {
    createTodo,
    getTodos,
    getTodoById
}
