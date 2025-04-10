const axios = require('axios');
const News= require('../models/news.model.js')

const getNews = async () => {
    try {
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines`,{
            params: {
                category: 'general',
                lang: 'en',
                country: 'in',
                max: 2,
                apikey: process.env.NEWS_API_KEY
            },
        });

        if (response.status!==200) {
            const apiErrorMsg=`News API responded with status ${response.status}`;
            console.error(apiErrorMsg, response.data || '');
            throw new Error(apiErrorMsg);
        }
    
        const articles= response.data.articles;
        for(let article of articles){
            let news= await News.findOne({newsUrl:article.url})

            if(news){
                news.newsTitle= article.title;
                news.newsDescription= article.description || "";
                news.newsContent= article.content || "";
                news.newsImage= article.urlToImage || "";
                news.newsPublishedAt= article.publishedAt;
                news.newsSource= article.source.name;
                await news.save();

            }else{
                news= await News.create({
                    newsTitle: article.title,
                    newsDescription: article.description,
                    newsContent: article.content,
                    newsUrl: article.url,
                    newsImage: article.image,
                    newsPublishedAt: article.publishedAt,
                    newsSource: article.source.name,
                })
            }
        }
    } catch(error){
       console.log("error getting & saving news to database",error)  
    }
};

const fetchNewsFromDB= async(req,res)=>{
    try {
        const news=await News.find()
        .sort({createdAt:-1})
        .limit(2)

        res.status(200).json({
            news
        })

    } catch (error) {
        console.log("error getting news from DB",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports = { 
    getNews,
    fetchNewsFromDB
}
