module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: "unq_user_email",
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "pk_tbl",
          unique: true,
          fields: [{ name: "id" }],
        },
        {
          name: "unq_user_email",
          unique: true,
          fields: [{ name: "email" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'name',
  //   'email',
  //   'password',
  // ];
  User.associate = (models) => {
    User.hasMany(models.Watchlist, {
      foreignKey: "user_id",
    });
  };

  return User;
};
