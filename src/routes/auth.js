const { Router } = require("express");
const router = Router();
const { hashPassword, comparePassword } = require("../utils/helpers");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send(400);
  }
  const userDB = await User.findOne({ email });
  if (!userDB) {
    return res.send(401);
  }
  const isValid = comparePassword(password, userDB.passsword);
  if (isValid) {
    console.log("Authenticated Successfully!");
    req.session.user = userDB;
    return res.send(200);
  } else {
    console.log("Failed to Authenticate");
    return res.send(401);
  }
});

router.post("/register", async (req, res) => {
  const { username, email } = req.body;
  const userDB = await User.findOne({ email });
  if (userDB) {
    res.status(400).send({ msg: "User already exists!" });
  } else {
    const password = hashPassword(req.body.password);
    console.log(password);
    const newUser = await User.create({ username, password, email });
    res.send(201);
  }
});

module.exports = router;
