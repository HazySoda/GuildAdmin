module.exports = (sequelize, DataTypes) => {
  const fields = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    members: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }

  const eventModel = sequelize.define('event', fields, {
    timestamps: false,
    tableName: 't_event',
    freezeTableName: true
  })

  return eventModel
}
