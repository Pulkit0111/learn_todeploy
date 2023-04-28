const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/User.routes")
const {auth}=require("./middleware/auth.middleware")
const {noteRouter}=require("./routes/Note.routes")
const cors=require("cors")
require("dotenv").config()

const app=express()

app.use(cors())
app.use(express.json())
app.use("/users",userRouter)

app.use(auth)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log(err)
        console.log("cannot connect to the DB")
    }
    console.log(`Server is running at port ${process.env.port}`)
})