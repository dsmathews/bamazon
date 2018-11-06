module.exports = function(sequelize, DataTypes) {
    const Products = sequelize.define('Products', {
      id: {
        primaryKey: true,
        type: sequelize.Integer,
        autoIncrement: true
      },
      
      product_name:{
          type: DataTypes.STRING,
          allowNull: false
      },
      
      department_name: {
          type: DataTypes.STRING,
          allowNull: false
      },

      price: {
          type: DataTypes.Integer,
          allowNull: false
      },

      stock_quantity: {
          type: DataTypes.Integer,
          allowNull: true
      },


    });
  };