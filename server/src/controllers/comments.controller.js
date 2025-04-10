const News= require('../models/news.model.js') 

const addComment= async(req,res)=>{
    const user= req.user;
    const newsId= req.params.newsId;
    const {comment}= req.body;

    if (!comment || comment.trim() === "") {
        return res.status(400).json({
            msg: "Comment cannot be empty."
        });
    }

    try {
        const news= await News.findById(newsId)
        if(!news){
            return res.status(404).json({
                msg:"couldn't find news"
            })
        }

        const newsComment= {
            user:user._id,
            comment:comment,
            createdAt: Date.now()
        }

        news.newsComments.push(newsComment)
        await news.save();

        return res.status(201).json({
            msg:"comment added",
            user:user._id,
            userName:user.userName,
            newsTitle:news.newsTitle,
        })
        

    } catch (error) {
        console.log("error adding comment",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}


const deleteComment= async(req,res)=>{
    const userId=req.user._id;
    const {commentId}=req.params;

    try {
        const news= await News.findOne({"newsComments._id":commentId});
        if (!news) {
            return res.status(404).json({
                msg: "comment not found"
            });
        }

        const commentIndex=news.newsComments.findIndex((comment)=>
            comment._id.toString()===commentId.toString() &&
            comment.user.toString()===userId.toString()
        )

        if(commentIndex===-1){
            return res.status(404).json({
                msg: "No comment found by this user"
            });
        }
        
        news.newsComments.splice(commentIndex, 1);
        await news.save();

        return res.status(200).json({
            msg:"comment deleted"
        })
        
    } catch (error) {
        console.log("error deleting comment",error)
        return res.status(500).json({
            msg:"internal server error"
        })

    }
}

const allComments= async(req,res)=>{
    const newsId= req.params.newsId;
    try {
        const news= await News.findById(newsId)
        if(!news){
            return res.status(400).json({
                msg:"news not found"
            })
        }

        const comments= news.newsComments;
        return res.status(200).json({
            comments
        })

    } catch (error) {
        console.log("error getting comments",error)
        return res.status(500).json({
            msg:"internal server error"
        })
        
    }
}
module.exports={
    addComment,
    deleteComment,
    allComments
}