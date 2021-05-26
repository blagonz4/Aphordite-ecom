const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'da99l1inkem70g',//database name
    'nswdegztbkglav', //user name
    'cdba805c32d6b9eeb06d32b4d589751fbbc7338a4a78d73dc590fa465e97c795', //pasword
    {
        dialect:'postgres',
        host:'localhost',
        port:'5432',
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