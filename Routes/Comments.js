const express = require('express');
const User = require('../Models/User')
const Posts = require('../Models/Post')
const helper = require('../RoutesHelpers/PostHelper')
const CommentsRouter = new express.Router();
//____________________________________________________________________________________________________________________________________
CommentsRouter.post('/addComment/:id' , async (req, res) => {
    try{   
        const userById = await User.findById(req.signedData.id);  
        const {id} = req.params;
        var {CommentBody} = req.body;
        var username = userById.username;
        try{
            var post = await Posts.findById(id)
            post.comments.push({username:username,CommentBody:CommentBody})
            await post.save();
        }
        catch{
            res.json({success: false, message: "post not found"});
        }
        res.send(post);
        }
    catch(err){
        console.error(err);
        res.json({success: false, message: err.message});
    }
    })
//____________________________________________________________________________________________________________________________________
CommentsRouter.patch('/updateComment/:id/:cid' , async (req, res) => {
    try{   
        const userById = await User.findById(req.signedData.id);  
        const {id,cid} = req.params;
        const flag = helper.checkAuthorization(id,userById);
        if (flag.find===true){
            var {CommentBody} = req.body;
            var username = userById.username;
            try{
                var post = await Posts.findById(id)
                var commentIndex = helper.findComment(cid,post)
                post.comments[commentIndex.index] = {username:username,CommentBody:CommentBody}
                await post.save();
            }
            catch{
                res.json({success: false, message: "post not found"});
            }
        }
        else  res.json({success: false, message: "this is not your comment"});
       
        res.json({success: true, message: "comment updated succ"});
        }
    catch(err){
        console.error(err);
        res.json({success: false, message: err.message});
    }
    })
//____________________________________________________________________________________________________________________________________
    CommentsRouter.delete('/deleteComment/:id/:cid' , async (req, res) => {
        try{   
            const userById = await User.findById(req.signedData.id);  
            const {id,cid} = req.params;
            const flag = helper.checkAuthorization(id,userById);
            if (flag.find===true){
                try{
                    var post = await Posts.findById(id)
                    var commentIndex = helper.findComment(cid,post)
                    post.comments.pull(post.comments[commentIndex.index])
                    await post.save();
                }
                catch{
                    res.json({success: false, message: "post not found"});
                }
            }
            else  res.json({success: false, message: "this is not your comment"});
           
            res.json({success: true, message: "comment deleted succ"});
            }
        catch(err){
            console.error(err);
            res.json({success: false, message: err.message});
        }
        })
//____________________________________________________________________________________________________________________________________
module.exports = CommentsRouter;


