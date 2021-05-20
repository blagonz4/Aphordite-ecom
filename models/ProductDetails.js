const Sequelize = require('sequelize');
const sequelize = require('../databases/databases').sequelize;
const Op = require('../databases/databases').Op;

const Size = require('./Sizes');
const ProductDetail = sequelize.define(
    'productdetail',{//Model name
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        product_id:{
            type: Sequelize.INTEGER
        },
        price:{
            type: Sequelize.FLOAT
        },
        cost:{
            type: Sequelize.FLOAT
        },
        color:{
            type: Sequelize.STRING
        },
        gender:{
            type: Sequelize.STRING
        },
        size_id:{
            type: Sequelize.INTEGER
        },
        image_id:{
            type :Sequelize.INTEGER
        },
        quanity:{
            type: Sequelize.INTEGER
        }
    },{timestamps:false,}
);

ProductDetail.hasOne(Size, {foreignKey:'id',sourceKey:'size_id'});

module.exports = ProductDetail;