const prisma = require("../lib/prisma");
const { reportStatus } = require("../lib/functions");

const getAllCats = async () => {
  try {
    const allCats = await prisma.cat.findMany();
    return reportStatus(200, allCats);
  } catch (err) {
    console.log("General error: " + err.code);
    return reportStatus(500, { message: "General server error" });
  }
};

const getCatById = async (id) => {
  try {
    const cat = await prisma.cat.findUnique({
      where: { id: parseInt(id) },
    });

    if (cat) {
      return reportStatus(200, cat);
    } else {
      return reportStatus(404, {
        message: `Cat with id: ${id} does not exist`,
      });
    }
  } catch (err) {
    console.log("General error: " + err.code);
    return reportStatus(500, { message: "General server error" });
  }
};

const createCat = async (cat) => {
  try {
    const dbCat = await prisma.cat.create({ data: cat });
    return reportStatus(201, dbCat);
  } catch (err) {
    if (err.code === "P2002") {
      console.log("Not unique record: " + err.code);
      return reportStatus(409, { message: "Cat with this name alredy exists" });
    } else {
      console.log("General error: " + err.code);
      return reportStatus(500, { message: "General server error" });
    }
  }
};

const deleteCat = async (id) => {
  try {
    const dbCat = await prisma.cat.delete({
      where: { id: parseInt(id) }
    });
    console.log("Deleted: " + dbCat);
    return reportStatus(200, dbCat);
  } catch (err) {
    if (err.code === "P2025") {
      console.log(`Cat with requested id: ${id} does not exist`);
      return reportStatus(404, {
        message: `Cat with id: ${id} does not exist`,
      });
    } else {
      console.log("General error: " + err.code);
      return reportStatus(500, { message: "General server error" });
    }
  }
};

const updateCat = async (cat) => {
  cat.id = parseInt(cat.id)
  console.log("want to update: " + cat.id);
  try {
    const dbCat = await prisma.cat.update({
      where: {
        id: cat.id,
      },
      data: cat,
    });
    return reportStatus(200, dbCat);
  } catch (err) {
    if (err.code === "P2025") {
      console.log(`Cat with requested id: ${cat.id} does not exist`);
      return reportStatus(404, {
        message: `Cat with id: ${cat.id} does not exist`,
      });
    } else {
      // console.log(err);
      console.log("General error: " + err.code);
      return reportStatus(500, { message: "General server error" });
    }
  }
};

module.exports = { getAllCats, getCatById, createCat, deleteCat, updateCat };
