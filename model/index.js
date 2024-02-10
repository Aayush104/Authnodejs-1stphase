const dbconfig = require('../Config/dbconfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Require and invoke the Usermodel.js function
db.users = require('./Usermodel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronization complete.');
});

module.exports = db;
