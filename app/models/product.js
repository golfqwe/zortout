module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // Automatically gets converted to SERIAL for postgres
    },
    producttype: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    sku: DataTypes.STRING,
    sellprice: DataTypes.STRING,
    purchaseprice: DataTypes.STRING,
    barcode: DataTypes.STRING,
    stock: DataTypes.STRING,
    availablestock: DataTypes.STRING,
    unittext: DataTypes.STRING,
    imagepath: DataTypes.STRING,
    imageList: DataTypes.STRING,
    weight: DataTypes.STRING,
    height: DataTypes.STRING,
    length: DataTypes.STRING,
    width: DataTypes.STRING,
    categoryid: DataTypes.STRING,
    category: DataTypes.STRING,
    variationid: DataTypes.STRING,
    variant: DataTypes.STRING,
    tag: DataTypes.STRING,
    sharelink: DataTypes.STRING,
    active: DataTypes.STRING,
    properties: DataTypes.STRING,
  });

  return Product;
};
