module.exports = (sequelize, DataTypes) => {
  const PaymentReturn = sequelize.define('payment_return', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // Automatically gets converted to SERIAL for postgres
    },
    orderId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    paymentdatetime: DataTypes.STRING,
    paymentdatetimeString: DataTypes.STRING,
    paymentmethodid: DataTypes.INTEGER,
    pricepernumber: DataTypes.INTEGER,
    link: DataTypes.STRING,
    verifySlip: DataTypes.STRING,
  });

  return PaymentReturn;
};
