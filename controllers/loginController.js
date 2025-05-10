const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByName } = require("../repo/user");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);


  const { name, pwd } = req.body.user;
  if (!name || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  dbUser = await findUserByName(name);
  if (!dbUser) res.status(401).json({ message: "User not registered" });

  const match = await bcrypt.compare(pwd, dbUser.pwd);
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: dbUser.name,
          roles: dbUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      // sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json(accessToken);
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
