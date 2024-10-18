const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      //لاتبعت الباسورد

      const temp = {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.status(200).json({ temp });
    } else {
      res
        .status(401)
        .json({ message: "فشل تسجيل الدخول: بيانات الاعتماد غير صحيحة" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
