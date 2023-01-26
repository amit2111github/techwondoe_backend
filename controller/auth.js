const { get_encrypted_password } = require("../service/encryption");
const db = require("../models/index.js");
const { models } = db.sequelize;
const jwt = require("jsonwebtoken");
const { User } = models;
const { secret } = require("../config/vars");

exports.signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.json({ error: "Email id Doesnt exits" });
		}
		if (user.password != get_encrypted_password(password)) {
			return res.json({ error: "Wrong Password" });
		}
		const token = jwt.sign(
			{
				id: user.dataValues.id,
				email,
			},
			secret,
			{ expiresIn: "1h" }
		);
		return res.json({ token, user });
	} catch (err) {
		console.log(err);
		return res.json({ error: "Signin failed" });
	}
};
exports.signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name) {
			return res.json({ error: "Name is Mandatory" });
		}
		if (!email) {
			return res.json({ error: "Email is Mandatory" });
		}
		if (!password) {
			return res.json({ error: "Password is Mandatory" });
		}
		let data = await User.findOne({ where: { email } });
		if (data) {
			return res.json({ error: "Email id already registered" });
		}
		data = await User.create({
			name,
			email,
			password: get_encrypted_password(password),
		});
		return res.json(data);
	} catch (err) {
		console.log(err);
		return res.json({ error: "Failed to create User" });
	}
};

exports.isSignedIn = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const user = jwt.verify(token, secret);
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.json({ error: "You are not signed in.", code: 1 });
	}
};

exports.isAuthenticated = (req, res, next) => {
	try {
		const user = req.user && req.user.id == req.body.id;
		if (!user) {
			return res.status(400).json({ error: "Access Denied." });
		}
		next();
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "Authorization required." });
	}
};
