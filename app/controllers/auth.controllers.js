const jwt = require('jsonwebtoken');
const BaseErr = require('../errors/baseErr');
const md5 = require('md5')

const User = require('../DataBase/models/user');

async function Register(req, res, next) {
	try {

		const oldUser = await User.findOne({
			where: { phone: req.body.phone }
		})
		if (oldUser) {
			throw new BaseErr(
				'TheUserIsAvailableWithThisPhoneNumber',
				403,
				true,
				`The user is available with this phone number`
			);
		}

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
				400,
				true,
				`The user not created`
			);
		}

		return res.status(201).json({
			success: true,
			message: 'User created.',
		});


	} catch (e) {
		next(e);
	}
}


async function login(req, res, next) {
	try {
		const user = await User.findOne({
			where: { phone: req.body.phone }
		})
		if (!user) {
			throw new BaseErr(
				'UserNotExisted',
				404,
				true,
				`the user not existed, Do you want to signUp?`
			);
		}

		if (user.password === md5(String(req.body.password))) {
			token = jwt.sign({
				user: {
					id: user.id
				}
			}, process.env.JWT_SECRET, { expiresIn: +process.env.JWT_EXPIRATION || 2592000 });

			user.setDataValue('token', token);
		} else {
			throw new BaseErr(
				'UserNotExisted',
				404,
				true,
				`the user not existed, Do you want to signUp?`
			);
		}

		return res.status(202).json({
			success: true,
			message: 'You login successfully.',
			name: user.fullName,
			accessToken: token
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