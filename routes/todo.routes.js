const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller')

router
    .post('/todos',
        todoController.createTodo)
    .get('/todos',
        todoController.getTodos
    )

module.exports = router