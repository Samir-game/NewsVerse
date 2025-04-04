const axios = require('axios');
const News= require('../models/news.model.js')

const getNews = async (req, res) => {
    try {
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
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
            if(!news){
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

        return res.status(200).json({
            msg:"news saved successfully",
            headlines:articles
        });

    } catch (error) {
        console.error("Error fetching news headlines from api:", error);
        return res.status(500).json({
            msg: "Internal server error",
        });
    }
};

module.exports = { 
    getNews 
}
