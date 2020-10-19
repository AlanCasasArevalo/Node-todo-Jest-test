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
    try {
        const id = req.params.id
        const todo = await TodoModel.findById(id)
        if (todo && typeof todo !== 'undefined') {
            res.status(200).json(todo)
        } else {
            res.status(404).json({
                message: 'Resource was not found'
            })
        }
    } catch (error) {
        next(error)
    }
}

const updateTodo = async (req, res, next) => {

    try {
        const id = req.params.id
        const updateTodo = await TodoModel.findByIdAndUpdate(id, req.body, {
            new: true,
            useFindAndModify: false
        })

        if (updateTodo && typeof updateTodo !== 'undefined') {
            res.status(200).json(updateTodo)
        } else {
            res.status(404).json({
                message: 'Resource was not found'
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteTodo = async (req, res, next) => {
        const id = req.params.id

        const deleteTodo = await TodoModel.findByIdAndDelete(id)
}

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
}
