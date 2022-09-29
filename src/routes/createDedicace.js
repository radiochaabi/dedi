const { Dedicace } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
  
module.exports = (app) => {
  app.post('/api/dedicaces', (req, res) => {
    Dedicace.create(req.body)
      .then(dedicace => {
        const message = `La dédicace ${req.body.name} a bien été crée.`
        res.json({ message, data: dedicace })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: 'error.message', data: error });
        }
        const message = `La dédicace n'a pas pu être ajoutée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}