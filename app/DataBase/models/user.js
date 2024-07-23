'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../conn');


const User = sequelize.define('user', {
	phone: {
		type: DataTypes.STRING(11),
		allowNull: false,
		unique: {
			args: true,
			msg: "The phone number must be unique. This phone number is already in use."
		},
		validate: {
			is: {
				args: /^(0)?9\d{9}$/i,
				msg: "The phone number must start with 09 or 9 and be followed by 9 digits."
			}
		}
	},
	fullName: {
		type: DataTypes.STRING,
		allowNull: true,
		validate: {
			is: {
				args: [/^[a-zA-Z\u0600-\u06FF\s]+$/],
				msg: "The full name can only contain letters and spaces."
			}
		}
	},
	email: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: {
			args: true,
			msg: "The email address must be unique. This email address is already in use."
		},
		validate: {
			isEmail: {
				args: true,
				msg: "Please enter a valid email address."
			}
		}
	},
	password: DataTypes.STRING,
	bio: {
		type: DataTypes.TEXT,
		allowNull: true,
		validate: {
			len: {
				args: [0, 500],
				msg: "The bio must be less than or equal to 500 characters."
			}
		}
	},
	status: {
		type: DataTypes.ENUM('active', 'inactive'),
		allowNull: false,
		defaultValue: 'active'
	}
}, {
	tableName: 'users',
	timestamps: true
});

module.exports = User;