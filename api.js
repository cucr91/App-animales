const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { Auth, isAuthenticated } = require('./auth.controller')
const Animal = require('./animal.controller')
const port = 3000

//mongoose.connect('mongodb://localhost:27017/miapp')
mongoose.connect('mongodb+srv://azkr:asdfghjkl1234@cluster11.yeqnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster11')


app.use(express.json())

app.get('/animals', isAuthenticated, Animal.list)
app.post('/animals', isAuthenticated, Animal.create)
app.put('/animals/:id', isAuthenticated, Animal.update)
app.patch('/animals/:id', isAuthenticated, Animal.update)
app.delete('/animals/:id', isAuthenticated, Animal.destroy)


app.post('/login', Auth.login)
app.post('/register', Auth.register)


app.use(express.static('app'))

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
	res.status(404).send('Esta página no existe :(')
})

app.listen(port, () => {
	console.log('Arrancando la aplicación!')
})
