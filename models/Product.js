module.exports = function(connection, Sequelize) {
    const Products = connection.define('Products', {
      productName:{
          type: Sequelize.STRING,
          allowNull: false
      },
      
      departmentName: {
          type: Sequelize.STRING,
          allowNull: false
      },

      price: {
          type: Sequelize.INTEGER,
          allowNull: false
      },

      stockQuantity: {
          type: Sequelize.INTEGER,
          allowNull: true
      },
    });
    return Products;
  };