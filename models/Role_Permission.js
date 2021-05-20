const Sequelize = require('sequelize');
const sequelize = require('../databases/databases').sequelize;
const Op = require('../databases/databases').Op;

const Role_Permission = sequelize.define(
    'Role_Permission',{//Model name
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        role_id:{
            type:Sequelize.INTEGER,
        },
        name:{
            type: Sequelize.STRING
        }
    },{timestamps:false,}
);

module.exports = Role_Permission;