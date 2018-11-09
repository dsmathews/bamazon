module.exports = function(connection, Sequelize) {
    const Product = connection.define('Product', {
      product_name:{
          type: Sequelize.STRING,
          allowNull: false
      },
      
      department_name: {
          type: Sequelize.STRING,
          allowNull: false
      },

      price: {
          type: Sequelize.FLOAT,
          allowNull: false
      },

      stock_quantity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
      
    });
    return Product;
  };