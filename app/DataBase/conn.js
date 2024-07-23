'use strict'

// load configurations
require('dotenv').config({ path: `.${process.env.NODE_ENV}.env`});

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS, {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT || 'mysql',
		timezone: '+03:30',
		define: {
			freezeTableName: true
		},
		pool: {
			max: 5, 
			min: 0,
			acquire: 15000, 
			idle: 10000 
		}
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Database connection has been established successfully.');
	} catch(e) {
		console.log(`Unable to connect to the database, error: ${e}`);
		process.exit(1);
	}
})();

module.exports = sequelize;