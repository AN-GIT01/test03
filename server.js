// https://www.youtube.com/watch?v=jivyItmsu18&list=PL0Zuz27SZ-6P4vnjQ_PJ5iRYsqJkQhtUu
// https://expressjs.com/en/guide/migrating-5.html#path-syntax

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const ROLES_LIST = require('./config/roles_list')
const verifyRoles = require('./middleware/verifyRoles')
const {getAllCats, getCatById, createCat, deleteCat, updateCat} = require( path.resolve(__dirname, 'repo', 'cat.js'))
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const PORT = process.env.SERVER_PORT || 4500;

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// app.use(cors());
 
// // built-in middleware for json 
app.use(express.json());

// // built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}))

// Middleware for cookies
app.use(cookieParser())

// //serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/test', (req, res) => {
    res.cookie('jwt', 'test string', {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})
    res.status(200).json({"message": "Test message2"})
})


app.use('/register', require('./routs/register'))
app.use('/logout', require('./routs/logout'))
app.use('/login', require('./routs/login'))

app.get('/cats', async (req, res) =>{
    const db_res = await getAllCats()
    console.log(db_res.data)
    res.status(db_res.code).json(db_res.data)
})

app.get('/cats/:id', async (req, res) =>{
    const db_res = await getCatById(req.params.id)
    res.status(db_res.code).json(db_res.data)
})

app.use(verifyJWT)


app.post('/cats', verifyRoles(ROLES_LIST.USER), async (req, res) =>{
    const db_res = await createCat(req.body.cat)
    res.status(db_res.code).json(db_res.data)
})

app.patch('/cats', verifyRoles(ROLES_LIST.USER), async (req, res) =>{
    console.log(req.body.cat)
    const db_res = await updateCat(req.body.cat)
    res.status(db_res.code).json(db_res.data)
})

app.delete('/cats', verifyRoles(ROLES_LIST.ADMIN), async (req, res) =>{
    console.log(req.body)
    const db_res = await deleteCat(req.body.cat.id)
    res.status(db_res.code).json(db_res.data)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
