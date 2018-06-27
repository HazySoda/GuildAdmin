module.exports = (sequelize, DataTypes) => {
  const fields = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    belongTo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    career: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstSkill: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    secondSkill: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstPublish: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }

  const roleModel = sequelize.define('role', fields, {
    timestamps: false,
    tableName: 't_role',
    freezeTableName: true
  })

  return roleModel
}
