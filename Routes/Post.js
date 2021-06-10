const express = require('express');
const User = require('../Models/User')
const Posts = require('../Models/Post')
const helper = require('../RoutesHelpers/PostHelper')
const postsRouter = new express.Router();


postsRouter.get('/getPost'  , async (req,res)=>{
    try{                                       
       const Post = await Posts.find({});
       res.send(Post);
    }
    catch(err){
        console.error(err);
        res.statusCode = 422;
        res.json({ success: false, message: err.message });
    }
})

postsRouter.get('/getPost/:id' , async (req, res) => {
    try{   
        const userById = await User.findById(req.signedData.id);        //update post
        const {id} = req.params;
        try{
            var post = await Posts.findById(id)
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

postsRouter.post('/addPost'  , async (req,res)=>{
    try{                                       
        console.log(req.signedData);
        const userById = await User.findById(req.signedData.id);
        const {title, PostBody } = req.body;
        const id = req.signedData.id;
        const username = userById.username;
        const NewPost = await Posts.create({ author:{id,username}, title:title, PostBody:PostBody  })
        userById.posts.push(NewPost);
        await userById.save();
        res.statusCode = 201;
        res.json({success: true, message: "Created succ"});
    }
    catch(err){
        console.error(err);
        res.statusCode = 422;
        res.json({ success: false, message: err.message });
    }
})

postsRouter.patch('/updatePost/:id' , async (req, res) => {
    try{   
        const userById = await User.findById(req.signedData.id);        //update post
        const {title, PostBody } = req.body;
        const {id} = req.params;
        const flag = helper.checkAuthorization(id,userById);
        console.log(flag);
        if (flag.find===true){
        const update = {title:title, PostBody:PostBody};
        const UpdatedPost =  await Posts.findByIdAndUpdate(id,update);
        res.json({success: true, message: "updated succ"});
        }
        else  res.json({success: false, message: "this is not your post"});
        }
    catch(err){
        console.error(err);
        res.json({success: false, message: err.message});
    }
    })


postsRouter.delete('/deletePost/:id' , async (req, res) => {
    try{   
        const userById = await User.findById(req.signedData.id);        //update post
        const {id} = req.params;
        const flag = helper.checkAuthorization(id,userById);
        if (flag.find===true){
            userById.posts.pull(userById.posts[flag.index])
            await userById.save(); 
            const deletedPost =  await Posts.findByIdAndDelete(id);
        res.json({success: true, message: "deleted succ"});
        }
        else  res.json({success: false, message: "this is not your post"});
        }
    catch(err){
        console.error(err);
        res.json({success: false, message: err.message});
    }
    })





module.exports = postsRouter;