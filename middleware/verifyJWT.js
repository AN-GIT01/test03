const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({"message": "cookies absent"});
    const accessToken = cookies.jwt;

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log(decoded);
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles.split('\n')
            next()
        }
    )
}

module.exports = verifyJWT