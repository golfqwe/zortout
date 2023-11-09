module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define('orderItems', {
    orderId: DataTypes.INTEGER,
    productid: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    unittext: DataTypes.STRING,
    pricepernumber: DataTypes.FLOAT,
    discount: DataTypes.STRING,
    discountamount: DataTypes.FLOAT,
    totalprice: DataTypes.FLOAT,
    producttype: DataTypes.INTEGER,
    skutype: DataTypes.STRING,
    bundleid: DataTypes.STRING,
    bundleitemid: DataTypes.STRING,
    bundlenumber: DataTypes.STRING,
    bundleCode: DataTypes.STRING,
    bundleName: DataTypes.STRING,
    integrationItemId: DataTypes.STRING,
    integrationVariantId: DataTypes.STRING,
    sell_vat_status: DataTypes.INTEGER,
    purchase_vat_status: DataTypes.INTEGER,
  });

  return OrderItems;
};
