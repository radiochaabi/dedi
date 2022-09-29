const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT //4000

app
.use(favicon(__dirname + '/favicon.ico'))
.use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
  res.json('Hello, Heroku ! 👋')
})

// Ici nous placerone nos futurs points de terminaisons.
require('./src/routes/findAllDedicaces')(app)
require('./src/routes/findDedicaceByPk')(app)
require('./src/routes/createDedicace')(app)
require('./src/routes/updateDedicace')(app)
require('./src/routes/deleteDedicace')(app)

// On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
