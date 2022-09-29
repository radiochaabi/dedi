const { Sequelize, DataTypes } = require('sequelize')
const DedicaceModel = require('../models/dedicace')
const dedicaces = require('./dedicace')
  
const sequelize = new Sequelize('dedidex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Dedicace = DedicaceModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    dedicaces.map(dedicace => {
      Dedicace.create({
        name: dedicace.name,
        pour: dedicace.pour,
        messages: dedicace.messages,
       /* picture: dedicace.picture,
        types: dedicace.types*/
      }).then(dedicace => console.log(dedicace.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Dedicace
}