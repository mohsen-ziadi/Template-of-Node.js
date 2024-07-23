'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../../DataBase/conn'); 


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
	},
	section:{
		type:DataTypes.STRING(150),
		allowNull:false
	}
}, {
	tableName: 'images',
	timestamps: true
});

module.exports = Image;