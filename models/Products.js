const Sequelize = require('sequelize');
const sequelize = require('../databases/databases').sequelize;
const Op = require('../databases/databases').Op;

const Brand = require('./Brands');
const Model = require('./Models');
const Collection = require('./Collections');
const ProductDetail = require('./ProductDetails');

const Product = sequelize.define(
    'product',{//Model name
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        name:{
            type: Sequelize.STRING
        },
        brand_id:{
            type:Sequelize.INTEGER
        },
        model_id:{
            type:Sequelize.INTEGER
        },
        collection_id:{
            type:Sequelize.INTEGER
        },
        description:{
            type: Sequelize.STRING
        }
    },{timestamps:false,}
);

Product.hasOne(Brand, { foreignKey: 'id', sourceKey: 'brand_id'});
Product.hasOne(Model, { foreignKey: 'id', sourceKey: 'model_id'});
Product.hasOne(Collection, { foreignKey: 'id', sourceKey: 'collection_id'});

Product.hasMany(ProductDetail, { foreignKey: 'product_id', sourceKey: 'id'});
ProductDetail.belongsTo(Product, { foreignKey: 'id', targetKey: 'id'});

module.exports = Product;