const mongoose= require('mongoose')
const DB_NAME= require('../constant.js')


const connectionDB= async()=>{
    try {
        const result= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB connected || host: ",result.connection.host)
    } catch (error) {
        console.log("error connecting to mongodb",error)
        process.exit(1)
    }
}

module.exports={
    connectionDB
}