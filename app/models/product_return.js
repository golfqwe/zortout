module.exports = (sequelize, DataTypes) => {
  const ProductReturn = sequelize.define('product_turn', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // Automatically gets converted to SERIAL for postgres
    },
    orderId: DataTypes.INTEGER,
    productid: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    unittext: DataTypes.STRING,
    pricepernumber: DataTypes.INTEGER,
    discount: DataTypes.STRING,
    totalprice: DataTypes.FLOAT,
    vat_status: DataTypes.INTEGER,
  });

  return ProductReturn;
};
