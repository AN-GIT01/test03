// https://www.youtube.com/watch?v=jivyItmsu18&list=PL0Zuz27SZ-6P4vnjQ_PJ5iRYsqJkQhtUu
// https://expressjs.com/en/guide/migrating-5.html#path-syntax

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const {getAllCats, getCatById, createCat, deleteCat, updateCat} = require( path.resolve(__dirname, 'repo', 'cat.js'))
// const errorHandler = require('./middleware/errorHandler')
// const {logger} = require('./middleware/logEvents')
// const verifyJWT = require('./middleware/verifyJWT')
// const cookieParser = require('cookie-parser')
// const corsOptions = require('./config/corsOptions')
// const credentials = require('./middleware/credentials')

// const getAllPosts = require('./src/api/posts_api')

require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const PORT = process.env.SERVER_PORT || 4500;
 
// // built-in middleware for json 
app.use(express.json());

// Cross Origin Resource Sharing
// app.use(cors(corsOptions));
app.use(cors());

// // built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}))

app.get('/cats', async (req, res) =>{
    const cats = await getAllCats()
    console.log(cats)
    res.json(cats)
})

app.get('/cats/:id', async (req, res) =>{
    const cat = await getCatById(req.params.id)
    res.json(cat)
})

app.post('/cats', async (req, res) =>{
    const cat = await createCat(req.body.cat)
    res.status(201).json(cat)
})

app.delete('/cats', async (req, res) =>{
    const cat = await deleteCat(req.body.id)
    res.status(200).json(cat)
})

app.patch('/cats', async (req, res) =>{
    console.log(req.body.cat)
    const cat = await updateCat(req.body.cat)
    res.status(200).json(cat)
})



// // custom middleware logger
// app.use(logger);

// // Handle options credentials check - before CORS!
// // and fetch cookies credentials requirement
// app.use(credentials);

// // Middleware for cookies
// app.use(cookieParser())

// //serve static files
// app.use('/', express.static(path.join(__dirname, '/public')));

// //routes
// app.use('/', require('./routes/root'))
// app.use('/register', require('./routes/register'))
// app.use('/auth', require('./routes/auth'))
// app.use('/refresh', require('./routes/refresh'))
// app.use('/logout', require('./routes/logout'))

// app.use(verifyJWT)
// app.use('/employees', require('./routes/api/employees'))

// // app.all('/{*splat}', (req, res)=>{
// app.all('*splat', (req, res)=>{
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });

// // errors handling
// app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));