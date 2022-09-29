const { Dedicace } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/dedicaces/:id', (req, res) => {
    Dedicace.findByPk(req.params.id)
    .then(dedicace => {
      if(dedicace === null) {
        const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      return Dedicace.destroy({ where: { id: dedicace.id } })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${dedicace.id} a bien été supprimé.`
        res.json({message, data: dedicace })
      })
    })
    .catch(error => {
      const message = `Le pokémon n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
})
}