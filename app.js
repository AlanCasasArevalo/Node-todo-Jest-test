const express = require('express')
const app = express()
const todoRoutes = require('./routes/todo.routes')
const mongoDB = require('./mongodb/mongodb.connection')

mongoDB.connect()

app.use(express.json())

app.get('/', (req, res) => {
    res.json('Holllaaaaaaa')
})

app.use('/', todoRoutes)

app.listen(3000, () => {
    console.log('Server is now running')
})

module.exports = app





