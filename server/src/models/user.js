module.exports = (sequelize, DataTypes) => {
  const fields = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }

  const userModel = sequelize.define('user', fields, {
    timestamps: false,
    tableName: 't_user',
    freezeTableName: true
  })

  return userModel
}
