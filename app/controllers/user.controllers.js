const jwt = require('jsonwebtoken');
const BaseErr = require('../errors/baseErr');
const shortHash = require('short-hash');
const md5 = require('md5')

const User = require('../DataBase/models/user');
const Account = require('../DataBase/models/account')

async function SignUp(req, res, next) {
	try {

		return res.status(200).json({
			success: true,
			message: 'User created.',
		});
		
		// return res.json({
		// 	success: true,
		// 	message: 'User created.',
		// });

	} catch (e) {
		next(e);
	}
}
async function login(req, res, next) {
	try {
	return res.status(200).json({
			success: true,
			message: 'You login successfully.',
		})
	} catch (e) {
		next(e);
	}
}

async function forgetPassword(req, res, next) {
	try {
		return res.status(200).json({
			success: true,
			message: 'the password changes',
		})
	} catch (e) {
		next(e);
	}
}


module.exports = {
	SignUp,
	login,
	forgetPassword
}