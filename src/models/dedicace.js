module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Dedicace', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    pour: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    messages: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },  
  }, 
  {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}

