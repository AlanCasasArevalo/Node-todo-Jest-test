const express = require('express')
const app = express()
const todoRoutes = require('./routes/todo.routes')

app.get('/', (req, res) => {
    res.json('Holllaaaaaaa')
})

app.use('/', todoRoutes)

app.listen(3000, () => {
    console.log('Server is now running')
})

module.exports = app





