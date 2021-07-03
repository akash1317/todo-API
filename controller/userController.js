const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//POST Route
//DESC SignUp
exports.SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    var user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "User Already Exists", statusCode: 400 });
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10); //Salt Generation for password encryption
    user.password = await bcrypt.hash(password, salt); //Hashing
    await user.save(); //For saving it in Database

    //Token Generation
    const payload = {
      user: {
        id: user.id,
      },
    };

    //Token Creation
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({
          msg: "User Created",
          statusCode: 200,
          user: user,
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

//POST Route
//DESC Login

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res.json({ statusCode: 400, msg: "User Doesn't exists!" });
    }

    const exists = await bcrypt.compare(password, user.password);
    if (!exists) {
      return res.json({ statusCode: 401, msg: "Incorrect Credentials." });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    //Token Creation
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({
          msg: "Successful Login",
          statusCode: 200,
          user: user,
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
