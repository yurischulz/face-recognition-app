const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express()
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: '$2a$10$tJCJmwOi59QZ8tWIA8AvtO11eqZduIvzphq0fZbOu1/u9GTYmAJpW',
      entries: 0,
      hash: '',
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      hash: '',
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      has: '',
      email: 'john@mai.com'
    }
  ]
}

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  bcrypt.compare(req.body.password, database.users[0].password, (err, match) => {
    if (req.body.email === database.users[0].email && match === true ) {
      res.json('success')
    } else {
      res.status(400).json('error loggin in')
    }
  })
})

app.post('/register', (req, res) => {
  const { email, name, password} = req.body

  bcrypt.hash(password, null, null, (err, hash) => {
    console.log(hash)
  })

  database.users.push({
    id: database.users.length + 1,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  })
  if (!found) {
    res.status(400).json('no such user')
  }
})

app.post('/image', (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) {
    res.status(400).json('no such user')
  }
})

app.listen(3000, () => {
  console.log('Hellooooooo there!!!')
})

/* Route Map
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
