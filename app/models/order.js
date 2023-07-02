module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // Automatically gets converted to SERIAL for postgres
    },
    ordertype: DataTypes.INTEGER,
    number: DataTypes.STRING,
    customerid: DataTypes.STRING,
    customername: DataTypes.STRING,
    customercode: DataTypes.STRING,
    customeridnumber: DataTypes.STRING,
    customeremail: DataTypes.STRING,
    customerphone: DataTypes.STRING,
    customeraddress: DataTypes.STRING,
    customerpostcode: DataTypes.STRING,
    customerprovince: DataTypes.STRING,
    customerdistrict: DataTypes.STRING,
    customersubdistrict: DataTypes.STRING,
    customerstreetAddress: DataTypes.STRING,
    customerbranchname: DataTypes.STRING,
    customerbranchno: DataTypes.STRING,
    facebookname: DataTypes.STRING,
    facebookid: DataTypes.STRING,
    line: DataTypes.STRING,
    lineid: DataTypes.STRING,
    reference: DataTypes.STRING,
    warehousecode: DataTypes.STRING,
    status: DataTypes.STRING,
    paymentstatus: DataTypes.STRING,
    marketplacename: DataTypes.STRING,
    marketplaceshippingstatus: DataTypes.STRING,
    marketplacepayment: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    vatamount: DataTypes.FLOAT,
    shippingvat: DataTypes.INTEGER,
    shippingchannel: DataTypes.STRING,
    shippingamount: DataTypes.INTEGER,
    shippingdate: DataTypes.STRING,
    shippingdateString: DataTypes.STRING,
    shippingname: DataTypes.STRING,
    shippingaddress: DataTypes.STRING,
    shippingphone: DataTypes.STRING,
    shippingemail: DataTypes.STRING,
    shippingpostcode: DataTypes.STRING,
    shippingprovince: DataTypes.STRING,
    shippingdistrict: DataTypes.STRING,
    shippingsubdistrict: DataTypes.STRING,
    shippingstreetAddress: DataTypes.STRING,
    trackingno: DataTypes.STRING,
    orderdate: DataTypes.STRING,
    orderdateString: DataTypes.STRING,
    paymentamount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    discount: DataTypes.STRING,
    platformdiscount: DataTypes.INTEGER,
    sellerdiscount: DataTypes.INTEGER,
    shippingdiscount: DataTypes.STRING,
    discountamount: DataTypes.INTEGER,
    voucheramount: DataTypes.INTEGER,
    vattype: DataTypes.INTEGER,
    saleschannel: DataTypes.STRING,
    vatpercent: DataTypes.INTEGER,
    createdby: DataTypes.STRING,
    createusername: DataTypes.STRING,
    createuserid: DataTypes.INTEGER,
    sharelink: DataTypes.STRING,
    isCOD: DataTypes.BOOLEAN,
    createdatetime: DataTypes.STRING,
    createdatetimeString: DataTypes.STRING,
    updatedatetime: DataTypes.STRING,
    updatedatetimeString: DataTypes.STRING,
    expiredate: DataTypes.STRING,
    expiredateString: DataTypes.STRING,
    receivedate: DataTypes.STRING,
    receivedateString: DataTypes.STRING,
    integrationName: DataTypes.STRING,
    integrationShop: DataTypes.STRING,
    agent: DataTypes.STRING,
    totalproductamount: DataTypes.INTEGER,
    uniquenumber: DataTypes.STRING,
    properties: DataTypes.STRING,
    isDeposit: DataTypes.BOOLEAN,
  });

  return Order;
};
