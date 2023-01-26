module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define(
    "Watchlist",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      streaming_app: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "watchlist",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "pk_watchlist",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'user_id',
  //   'title',
  //   'streaming_app',
  //   'rating',
  //   'review',
  // ];
  Watchlist.associate = (models) => {
    Watchlist.belongsTo(models.User, {
      foreignKey: "user_id",
      sourceKey: "id",
      as: "user",
    });
  };

  return Watchlist;
};
