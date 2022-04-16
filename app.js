const express = require("express")
const app = express();
const dotenv = require("dotenv") //Allows you to seperate your secret from your sourcecode
const morgan = require("morgan")//Allows to log a request on the console
const path = require("path")
const connectDB = require("./server/database/connecion")



dotenv.config({path: 'config.env'}) //Getting the path of the env file
const PORT = process.env.PORT||8080

//log request
app.use(morgan("tiny"))

//Mongodb Connection
connectDB()

//Parse request to body parser(installed in the recent express)
app.use(express.urlencoded({extended:true}))

//set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname,"view/ejs"))


//Handling errors
function errorHandler(err, req,res,next){
    if (err){
        res.send(err)
    }
}

//Load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//Load Routers
app.use('/', require('./server/routes/router'))
app.use(errorHandler)
app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost${PORT}`)
})