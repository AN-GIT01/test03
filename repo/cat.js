const prisma = require("../lib/prisma");

const getAllCats = async () => {
  try {
      const allCats = await prisma.cat.findMany();
      return {
        code: 200,
        data: allCats,
      };
  } catch (err) {
    console.log("General error: " + err.code);
    return {
      code: 500,
      data: { message: "General server error" },
    };  
  }
};

const getCatById = async (id) => {
  try {
    const cat = await prisma.cat.findUnique({
    where: { id: parseInt(id) },
    });

    if (cat) {
      return {
        code: 200,
        data: cat,
      };
    } else {
      return {
        code: 404,
        data: { message: `Cat with id: ${id} does not exist` },
      };
    }
  } catch (err) {
    console.log("General error: " + err.code);
    return {
      code: 500,
      data: { message: "General server error" },
    };    
  }
};

const createCat = async (cat) => {
  try {
    const dbCat = await prisma.cat.create({ data: cat });
    return {
      code: 201,
      data: dbCat,
    };
  } catch (err) {
    if (err.code === "P2002") {
      console.log("Not unique record: " + err.code);
      return {
        code: 409,
        data: { message: "Cat with this name alredy exists" },
      };
    } else {
      console.log("General error: " + err.code);
      return {
        code: 500,
        data: { message: "General server error" },
      };
    }
  }
};

const deleteCat = async (id) => {
  const dbCat = await prisma.cat.delete({
    where: { id: parseInt(id) },
  });
  console.log("Deleted: " + dbCat);
  return dbCat;
};

const updateCat = async (cat) => {
  console.log("want to update: " + cat.id);
  const dbCat = await prisma.cat.update({
    where: {
      id: parseInt(cat.id),
    },
    data: cat,
  });
  return dbCat;
};

module.exports = { getAllCats, getCatById, createCat, deleteCat, updateCat };
