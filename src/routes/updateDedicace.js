const { Dedicace } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')

module.exports = (app) => {
  app.put('/api/dedicaces/:id', (req, res) => {
    const id = req.params.id
    Dedicace.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return dedicace.findByPk(id).then(dedicace => {
        if(dedicace === null) {
          const message = `La dédicace demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `La dédicace ${dedicace.name} a bien été modifiée.`
        res.json({message, data: dedicace })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `La dédicace n'a pas pu être modifiée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}