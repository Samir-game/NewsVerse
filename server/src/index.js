const dotenv= require('dotenv')
const {connectionDB}= require('./database/db.js')
const app= require('./app.js')
const cron= require('node-cron')
const {getNews}= require('./controllers/news.controller.js')

dotenv.config({
    path:"./.env"
})

const getNewsTask= async()=>{
    try {
        console.log("fetching news from gnews.io")
        await getNews()
    } catch (error) {
        console.log("error getting news",error)
    }
}

connectionDB()
.then(()=>{
    app.listen(process.env.PORT || 80001,()=>{
        console.log("Server started at PORT: ",process.env.PORT)
    })

    cron.schedule("*/59 * * * *",getNewsTask)
    console.log("Cron job scheduled: News will be fetched every 1 minutes.");

})
.catch((error)=>{
    console.log("error starting mongodb", error)
})