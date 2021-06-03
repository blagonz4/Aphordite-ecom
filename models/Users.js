const Sequelize = require('sequelize');
const sequelize = require('../databases/databases').sequelize;
const Op = require('../databases/databases').Op;
const User = sequelize.define(
    'user',{//Model name
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        name:{
            type: Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING,
        },
        phone:{
            type:Sequelize.STRING,
        },
        role_id:{
            type:Sequelize.INTEGER,
        },
        password:{
            type:Sequelize.STRING,
        },
        created_at:{
            type:Sequelize.DATE,
        },
    },{timestamps:false,}
);

module.exports = User;