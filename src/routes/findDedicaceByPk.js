const { Dedicace } = require('../db/sequelize')
  

module.exports = (app) => {
  app.get('/api/dedicaces/:id', (req, res) => {
    Dedicace.findByPk(req.params.id)
      .then(dedicace => {
        if(dedicace === null) {
          const message = `La dédicace demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const message = 'Une dédicace a bien été trouvée.'
        res.json({ message, data: dedicace })
      })
      .catch(error => {
        const message = `La dédicace n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}