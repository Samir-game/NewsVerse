const dotenv= require('dotenv')
const {connectionDB}= require('./database/db.js')
const app= require('./app.js')

dotenv.config({
    path:"./.env"
})

connectionDB()
.then(()=>{
    app.listen(process.env.PORT || 80001,()=>{
        console.log("Server started at PORT: ",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("error starting mongodb", error)
})