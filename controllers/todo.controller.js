const TodoModel = require("../model/todo.model");

const createTodo = () => {
    TodoModel.create()
}

module.exports = {
    createTodo
}
