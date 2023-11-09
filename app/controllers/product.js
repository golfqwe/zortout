const cliProgress = require('cli-progress');
const db = require('../models');

const instance = require('../api/api_instance');

const ProductModel = db.product;

const b2 = new cliProgress.Bar({
  barCompleteChar: '#',
  barIncompleteChar: '_',
  format: ' |- Insert Progress : {percentage}%' + ' - ' + '||{bar}||',
  fps: 5,
  stream: process.stdout,
  barsize: 30,
});

const getProduct = async () => {
  try {
    const { data } = await instance.get('Product/GetProducts');
    b2.start(data.list.length, 0);
    let index = 0;
    for (const product of data.list) {
      index += 1;
      await db.sequelize.transaction(async (t) => {
        const [foundProduct] = await ProductModel.findOrCreate({
          where: { id: product.id },
          defaults: { ...product, imageList: product.imageList.toString() },
          transaction: t,
        });

        if (foundProduct) {
          await ProductModel.update(
            { status: { ...product, imageList: product.imageList.toString() } },
            {
              where: {
                id: product.id,
              },
              transaction: t,
            },
          );
        }
      });

      b2.update(Math.floor(index * data.list.length + 1));
    }
    b2.stop();
    console.log('\x1b[33m Insert product success fully! \x1b[0m');
  } catch (error) {
    console.error('🚀 ~ file: order.js:9 ~ getOrder ~ error:', error);
  }
};

module.exports = {
  getProduct,
};
