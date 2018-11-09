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

      stockQuantity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

      price: {
          type: Sequelize.FLOAT,
          allowNull: false
      },

      
    },{
        freezeTableName: true
    });
    return Products;
  };