const express = require('express');
const User = require('../Models/User')
const Posts = require('../Models/Post')
const helper = require('../RoutesHelpers/PostHelper')
const ReactsRouter = new express.Router();
//____________________________________________________________________________________________________________________________________
ReactsRouter.post('/addReact/:id' , async (req, res) => {
    try{   
        const userById = await User.findById(req.signedData.id);  
        const {id} = req.params;
        var {ReactType} = req.body;
        var username = userById.username;
        try{
            var post = await Posts.findById(id)
            post.Reacts.push({username:username,ReactType:ReactType})
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
ReactsRouter.patch('/updateReact/:id/:rid' , async (req, res) => {
    try{   
        const userById = await User.findById(req.signedData.id);  
        const {id,rid} = req.params;
        const flag = helper.checkAuthorization(id,userById);
        if (flag.find===true){
            var {ReactType} = req.body;
            var username = userById.username;
            try{
                var post = await Posts.findById(id)
                var ReactsIndex = helper.findReact(rid,post)
                post.Reacts[ReactsIndex.index] = {username:username,ReactType:ReactType}
                await post.save();
            }
            catch{
                res.json({success: false, message: "post not found"});
            }
        }
        else  res.json({success: false, message: "this is not your React"});
       
        res.json({success: true, message: "React updated succ"});
        }
    catch(err){
        console.error(err);
        res.json({success: false, message: err.message});
    }
    })

//____________________________________________________________________________________________________________________________________

    ReactsRouter.delete('/deleteReact/:id/:rid' , async (req, res) => {
        try{   
            const userById = await User.findById(req.signedData.id);  
            const {id,rid} = req.params;
            const flag = helper.checkAuthorization(id,userById);
            if (flag.find===true){
              
                    var post = await Posts.findById(id)
                    var ReactsIndex = helper.findReact(rid,post)
                    post.Reacts.pull(post.Reacts[ReactsIndex.index])
                    await post.save();
               
            }
            else  res.json({success: false, message: "this is not your React"});
           
            res.json({success: true, message: "react deleted succ"});
            }
        catch(err){
            console.error(err);
            res.json({success: false, message: err.message});
        }
        })
//____________________________________________________________________________________________________________________________________
module.exports = ReactsRouter;


