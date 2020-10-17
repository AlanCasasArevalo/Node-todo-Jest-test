const TodoModel = require("../model/todo.model");

const createTodo = async (req, res, next) => {
    const body = req.body
    const createModel = await TodoModel.create(body)
    res.status(201).json(createModel)
}

module.exports = {
    createTodo
}
