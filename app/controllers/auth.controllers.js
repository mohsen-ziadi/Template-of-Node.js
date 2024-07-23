const jwt = require('jsonwebtoken');
const BaseErr = require('../errors/baseErr');
const md5 = require('md5')

const User = require('../DataBase/models/user');

async function Register(req, res, next) {
	try {

		const user = await User.create({
			phone: req.body.phone,
			email: req.body.email,
			fullName: req.body.fullName,
			password: md5(req.body.password),
			bio: req.body.bio
		})

		if (!user) {
			throw new BaseErr(
				'TheUserNotCreated',
				httpStatusCodes.BAD_REQUEST,
				true,
				`The user not created`
			);
		}

		return res.status(200).json({
			success: true,
			message: 'User created.',
		});


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
	Register,
	login,
	forgetPassword
}