console.log('something')

const prisma = require('./lib/prisma')

async function addCat(cat) {
 try {
      await prisma.cat.create({data: cat})
 } catch(err) {
    console.log('Error happened: ' + err.message.split('\n')[1])
 }

  const allCats = await prisma.cat.findMany()
  console.dir(allCats, { depth: null })
}

const cat = {
        description: 'Barsic3 description',
        name: "Barsic3"
}

addCat(cat)
  .then(async () => {
    await prisma.$disconnect()
  })