const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("Welcome in outfit delight backend....");
});

// router.post("/post", (req, res) => {
// 	const username = req.body.username;
// 	res
// 		.send("your username is " + username)
// 		.then((res) => {
// 			console.log(res);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

module.exports = router;
