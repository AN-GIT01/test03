const prisma = require('../lib/prisma')

const getAllCats = async () => {
    const allCats = await prisma.cat.findMany()
    return allCats
}

const getCatById = async (id) => {
    const cat = await prisma.cat.findUnique({
        where: { id: parseInt(id) },
      }
    )
    return cat
}

const createCat = async (cat) => {
    const dbCat = await prisma.cat.create({data: cat})
    return dbCat
}

const deleteCat = async (id) => {
    const dbCat = await prisma.cat.delete({
        where: { id: parseInt(id) },
      })
    console.log("Deleted: " + dbCat)
    return dbCat
}

const updateCat = async (cat) => {
    console.log("want to update: " + cat.id)
    const dbCat = await prisma.cat.update({
        where: {
          id: parseInt(cat.id),
        },
        data: cat
      })
    return dbCat
}

module.exports = {getAllCats, getCatById, createCat, deleteCat, updateCat}