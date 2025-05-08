const prisma = require("../lib/prisma");
const { reportStatus } = require("../lib/functions");

const createDbUser = async (user) => {
    try {
      const dbUser = await prisma.user.create({ data: user });
      return reportStatus(201, dbUser);
    } catch (err) {
      if (err.code === "P2002") {
        console.log("Not unique record: " + err.code);
        return reportStatus(409, { message: "User with this name alredy exists" });
      } else {
        console.log("General error: " + err.code);
        return reportStatus(500, { message: "General server error" });
      }
    }
  };


  const findUserByName = async(name) =>{
    try {
        const dbUser = await prisma.user.findFirst({
            where: { name: name }
          }
        )
        return dbUser
    } catch(err) {
        console.log("findUserByName error: " + err.message)
    }
  }


//   module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser };
  module.exports = {createDbUser, findUserByName};