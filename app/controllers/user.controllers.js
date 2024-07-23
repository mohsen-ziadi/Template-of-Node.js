const jwt = require('jsonwebtoken');
const BaseErr = require('../errors/baseErr');
const shortHash = require('short-hash');
const md5 = require('md5')

const User = require('../DataBase/models/user');


async function getMyData(req, res, next) {
	try {
		const user = await User.findOne({
			where: { id: req.user.id },
			attributes: { exclude: ['password'] }
		});

		if (!user) {
			throw new BaseErr(
				'TheUserNotFound',
				404,
				true,
				`The user not found:(`
			);
		}

		return res.status(200).json({
			success: true,
			message: 'The process is done',
			data: user
		});

	} catch (e) {
		next(e);
	}
}

async function editMyData(req, res, next) {
	try {
		const { fullName, bio } = req.body;

		const updated = await User.update(
			{ fullName, bio },
			{
				where: { id: req.user.id },
			}
		);

		if (!updated) {
			throw new BaseErr(
				'UpdateUserEror',
				400,
				true,
				`Update user eror`
			);
		}

		const updatedUser = await User.findOne({ where: { id: req.user.id } });
		return res.status(200).json({
			success: true,
			message: 'The process is done',
			data: updatedUser
		});

	} catch (e) {
		next(e);
	}
}

async function remove(req, res, next) {
	try {
		const user = await User.destroy({
			where: { id: req.user.id }
		  });

		console.log("user>",user);
		return res.status(200).json({
			success: true,
			message: 'The user removed'
		});

	} catch (e) {
		next(e);
	}
}


module.exports = {
	getMyData,
	editMyData,
	remove
}