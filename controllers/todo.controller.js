const TodoModel = require("../model/todo.model");

const createTodo = (req, res, next) => {
    const body = req.body
    TodoModel.create(body)
}

module.exports = {
    createTodo
}
