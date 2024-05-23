require('dotenv').config()
const express = require('express')
const sequelize = require('./db.js')
const models = require('../server/models/models.js')
const PORT = process.env.PORT
const cors = require('cors')
const fileupload = require('express-fileupload')
const router = require('./routes/index.js')

const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')
const corsOptions = {
    origin: '*', // Разрешить только этот домен
    optionsSuccessStatus: 204 // Некоторые браузеры на старых платформах не могут обрабатывать коды 204
};


const app = express()
app.use(cors(corsOptions));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(express.json())
app.use(fileupload({}))
app.use('/api' , router)
app.use(errorHandler)
app.get('/',(req,res) => {
    res.status(200).json({message: "Wordking"})



})





const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()