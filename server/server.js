const express = require('express')

const app = express()

app.get('*', (req, res) => {
    res.json({name: 'ciel', sex: 'girl'})
})

app.listen(8000, ()=> {
    console.log('server start')
})