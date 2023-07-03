module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define('orderItems', {
    orderId: DataTypes.INTEGER,
    productid: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    unittext: DataTypes.STRING,
    pricepernumber: DataTypes.INTEGER,
    discount: DataTypes.STRING,
    discountamount: DataTypes.INTEGER,
    totalprice: DataTypes.INTEGER,
    producttype: DataTypes.INTEGER,
    skutype: DataTypes.STRING,
    bundleid: DataTypes.STRING,
    bundleitemid: DataTypes.STRING,
    bundlenumber: DataTypes.STRING,
    bundleCode: DataTypes.STRING,
    bundleName: DataTypes.STRING,
    integrationItemId: DataTypes.STRING,
    integrationVariantId: DataTypes.STRING,
  });

  return OrderItems;
};
