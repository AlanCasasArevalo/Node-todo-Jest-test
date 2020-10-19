const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller')

router
    .post('/todos',
        todoController.createTodo)
    .get('/todos',
        todoController.getTodos
    )
    .get('/todos/:id',
        todoController.getTodoById
    )
    .put('/todos/:id',
        todoController.updateTodo
    )

module.exports = router