'use strict'
const { use } = require('../api/v1/auth.api');
const User = require('../DataBase/models/user');


// validation's functions
async function checkPhone(req, res, next) {

	let regex = new RegExp(/^(\+98?)?{?(0?9[0-9]{9}}?)$/, 'g')
	let checkPhone = regex.test(req.body.phone)
	if (!req.body.phone) {
		return res.status(400).json({ success: false, message: 'The phone field is required.' })
		
	} else if (!checkPhone) {
		return res.status(403).json({ success: false, message: 'The phone number is wrong' })

	} else {
		next()
	}

}

async function checkPassword(req, res, next) {
	const password = req.body.password;
	const confirmPassword = req.body.confrimPassword;

	if (!password || !confirmPassword) {
		return res.status(400).json({ success: false, message: 'The password field and password confirmation are required.' });
	}

	if (password !== confirmPassword) {
		return res.status(403).json({ success: false, message: 'Password and confirm password are not the same.' });
	}

	if (password.length < 8) {
		return res.status(403).json({ success: false, message: 'The password must be at least 8 characters long.' });
	}

	const conditions = [
		{ regex: /^\S*$/, message: 'The password must not contain any spaces.' },
		{ regex: /\d/, message: 'The password must contain at least one number.' },
		{ regex: /[!@#$%^&*]/, message: 'The password must contain at least one special character.' },
		{ regex: /[a-z]/, message: 'The password must contain at least one lowercase letter.' },
		{ regex: /[A-Z]/, message: 'The password must contain at least one uppercase letter.' },
	];

	for (const condition of conditions) {
		if (!condition.regex.test(password)) {
			return res.status(403).json({ success: false, message: condition.message });
		}
	}

	next();
}


async function checkEmail(req, res, next) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const checkEmail = regex.test(req.body.email);
	if (!req.body.email) {
		return res.status(400).json({ success: false, message: 'The email field is required.' })

	}

	const user = await User.findOne({
		where: { email: req.body.email }
	})

	if (!checkEmail) {
		return res.status(403).json({ success: false, message: 'The email is wrong' })

	} else if (user) {
		return res.status(403).json({ success: false, message: 'The user is available with this email' })

	} else {
		next()
	}

}



// export middleware
module.exports = {
	checkPhone,
	checkPassword,
	checkEmail
}