const verifyRoles = (...allowedRoles) => {
    return (req, res, next) =>{
        if(!req?.roles) return res.sendStatus(401)
        const rolesArray = allowedRoles
        console.log(rolesArray)
        console.log(req.roles)

        const result = req.roles.map(role => allowedRoles.includes(role)).find(val => val === true)
        if(!result) {
            return res.status(401).json({"message": "your role is not valid for this action"})
        } else {
            next()
        }        
    }
}

module.exports = verifyRoles