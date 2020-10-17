const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json('Holllaaaaaaa')
})

app.listen(3000, () => {
    console.log('Server is now running')
})






