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
}

module.exports = {
    createTodo,
    getTodos
}
