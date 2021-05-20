const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'postgres',//database name
    'postgres', //user name
    'user', //pasword
    {
        dialect:'postgres',
        host:process.env.PGPORT,
        operatorsAliases: false,
        pool:{
            max:5,
            min:0,
            require:5000,
            idle:10000
        }
    }
);

const Op = Sequelize.Op;
module.exports = {
    sequelize,
    Op
}