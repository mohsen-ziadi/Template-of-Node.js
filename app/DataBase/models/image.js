'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../conn');

const Image = sequelize.define('image', {
	src: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING(150),
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
}, {
	tableName: 'images',
	timestamps: true
});

module.exports = Image;