const axios = require('axios');

const getNews = async (req, res) => {
    try {

        const response = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
            params: {
                category: 'general',
                lang: 'en',
                country: 'in',
                max: 10,
                apikey: process.env.NEWS_API_KEY
            },
        });

        if(response.status!==200){
            return res.status(500).json({
                msg:"error in news api"
            })
        }
    
        const headlines= response.data.articles;

        return res.status(200).json({
            headlines:headlines
        });

    } catch (error) {
        console.error("Error fetching news headlines:", error);

        return res.status(500).json({
            msg: "Internal server error",
        });
    }
};

module.exports = { 
    getNews 
}
