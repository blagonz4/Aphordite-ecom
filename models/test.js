const Sequelize = require('sequelize');
const sequelize = require('../databases/databases').sequelize;
const Op = require('../databases/databases').Op;
const test = sequelize.define(
    'test',{//Model name
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        name:{
            type: Sequelize.STRING
        }
    },{timestamps:false,}
);

module.exports = test;