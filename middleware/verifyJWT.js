const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    // const authHeader = req.headers.authorization || req.headers.Authorization
    // if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
    // console.log(authHeader)
    // const token = authHeader.split(' ')[1]
    // jwt.verify(
    //     token,
    //     process.env.ACCESS_TOKEN_SECRET,
    //     (err, decoded) => {
    //         if(err) return res.sendStatus(403)
    //         req.user = decoded.UserInfo.username
    //         req.roles = decoded.UserInfo.roles
    //         next()
    //     }
    // )

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