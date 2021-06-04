const Sequelize = require('sequelize');
const sequelize = new Sequelize(
        'postgres',//database name
        'postgres', //user name
        'user', //pasword
        {
            dialect:'postgres',
            host:'localhost',
            operatorsAliases: false,
            pool:{
                max:5,
                min:0,
                require:5000,
                idle:10000
            }
        }
    
);

// const sequelize = new Sequelize(
//     'postgres://nswdegztbkglav:cdba805c32d6b9eeb06d32b4d589751fbbc7338a4a78d73dc590fa465e97c795@ec2-34-193-112-164.compute-1.amazonaws.com:5432/da99l1inkem70g',
//     {
//         logging: false,
//         ssl: { rejectUnauthorized: false } //solved the problem with self signed sertificate
//     } );
const Op = Sequelize.Op;
module.exports = {
    sequelize,
    Op
}