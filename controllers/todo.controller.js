const TodoModel = require("../model/todo.model");

const createTodo = (req, res, next) => {
    const body = req.body
    const createModel = TodoModel.create(body)
    res.status(201).json(createModel)
}

module.exports = {
    createTodo
}
