module.exports = function(sequelize, DataTypes) {
    const Products = sequelize.define('Products', {
      id: {
        primary_key: id,
        type: DataTypes.Integer,
        allowNull: false
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