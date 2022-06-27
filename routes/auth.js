const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
	const NewUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString(),
	});

	try {
		const savedUser = await NewUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// LOGIN
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({
			username: req.body.username,
		});
		if (!user) return res.status(403).json("Username does not match");

		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC
		);
		const orignallyPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
		const userInputPassword = req.body.password;
		if (orignallyPassword != userInputPassword)
			return res.status(403).json("You have entered wrong password...");
		// const { password, ...other } = user;

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json("server crash", err);
	}
});
module.exports = router;
