const { Dedicace } = require('../db/sequelize')
const { Op } = require('sequelize')
  
module.exports = (app) => {
  app.get('/api/dedicaces', (req, res) => {
    if(req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if(name.length < 2) {
        const message = `Le terme de recherche doit contenir au minimum 2 caractères.`
        return res.status(400).json({ message })        
      }

      return Dedicace.findAndCountAll({
         where: {
            name: { // 'name' est la propriété du modéle dédicace
              [Op.like]: `%${name}%` // 'name' est le critére de la recherche
            }
          },
          order: ['name'],
          limit: limit
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} qui correspondent au terme de recherche ${name}.`
        return res.json({ message, data: rows })
      })
    } else {
      Dedicace.findAll({ order: ['name']})
      .then(dedicaces => {
        const message = 'La liste des dédicaces a bien été récupérée.'
        res.json({ message, data: dedicaces })
      })
      .catch(error => {
        const message = `La Liste des dédicaces n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error})
      })
    }    
  })
}