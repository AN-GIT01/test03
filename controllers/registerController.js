const bcrypt = require("bcrypt");
const { createDbUser, findUserByName } = require("../repo/user");

const handleNewUser = async (req, res) => {
  const { name, pwd, role } = req.body.user;
  if (!name || !pwd || !role)
    return res.status(400).json({ message: "Username, password and role are required" });

  // check for duplicate usernames
  dbUser = await findUserByName(name);
  if (dbUser) return res.status(409).json({ message: "User with this name already exists"}); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const resDb = await createDbUser({
      name: name,
      pwd: hashedPwd,
      role: role,
    });
    return res.status(resDb.code).json(resDb.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
