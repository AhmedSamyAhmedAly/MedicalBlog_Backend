const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User')
const authenticationMiddleware = require('../MiddleWares/Authentication');
const logoutMiddleware = require('../MiddleWares/Logout');
const helper = require('../RoutesHelpers/UserHelper')

const userRouter = new express.Router();





//____________________________________________________________________________________________________________________________________

userRouter.get('/getUsers',async(req,res)=>{
    try{
        const users = await User.find({});  // just to get all users for me to test
        res.send(users)
    }
    catch(err){
        console.error(err);
        res.statusCode = 422;
        res.json({ success: false, message: err.message });
    }
})

//____________________________________________________________________________________________________________________________________

userRouter.post('/reg'  , async (req,res)=>{    // the registration router
    try{
        const {username, email , password , UserType } = req.body;
        const hash = await bcrypt.hash(password,7); // to hash the password
        const user = await User.create({username, email ,password:hash,UserType })
        res.statusCode = 201;
        res.send(user);
    }
    catch(err){
        console.error(err);
        res.statusCode = 422;
        res.json({ success: false, message: err.message });
    }
})

//____________________________________________________________________________________________________________________________________

userRouter.post('/login'  , async (req,res)=>{      // the login router
    try {
    const {username, password} = req.body;
    const user = await User.findOne({ username }).exec(); 
    if(!user) throw new Error("wrong username or password");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("wrong username or password");
    const token = jwt.sign({ id: user.id }, process.env.SecretKey);
    res.json({ token });
} catch (err) {
    console.error(err);
    res.statusCode = 422;
    res.json({success: false, message: err.message});
}
});
//____________________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________________

userRouter.use(authenticationMiddleware)
// this will make only the logged user to use the below functions
//____________________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________________

userRouter.get('/myProfile' , async (req, res) => { // will show the info of my profile
    try{
        const user = await User.findOne({ _id: req.signedData.id }, { password: 0 }); // password=0 means dont show it to me
        res.send(user);
    }
    catch(err){
        console.error(err);
        res.statusCode = 404;
        res.json({success: false, message: err.message});
    }
})


userRouter.get('/MyPosts' , async (req, res) => {
    try{                                                                // this router will delete the user profile and its data
        const userById = await User.findById(req.signedData.id);
        res.send(await helper.Myposts(userById.posts));
    }
    catch(err){
        console.error(err);
        res.json({success: false, message: err.message});
    }
    })


//____________________________________________________________________________________________________________________________________

userRouter.patch('/profileUpdate' , async (req, res) => {   // update router for user
try{
    const {username,email} = req.body;
    const user = await User.updateOne({ _id: req.signedData.id },{$set: {username:username,email:email}} );
    res.send(user);
}
catch(err){
    console.error(err);
    res.json({success: false, message: err.message});
}
})

//____________________________________________________________________________________________________________________________________

userRouter.delete('/profileDelete' , async (req, res) => {
    try{                                                                // this router will delete the user profile and its data
        const userById = await User.findById(req.signedData.id);
        await helper.deleteMyposts(userById.posts)
        const user = await User.deleteOne({ _id: req.signedData.id } );   //delete the user it self
        res.json({success: true, message:"user deleted succ"});
    }
    catch(err){
        console.error(err);
        res.json({success: false, message: err.message});
    }
    })



//____________________________________________________________________________________________________________________________________
userRouter.use(logoutMiddleware)
//____________________________________________________________________________________________________________________________________
userRouter.post('/logout'  , async (req,res)=>{      // the logout router
    try {
    res.send("logout succ");
} catch (err) {
    console.error(err);
    res.statusCode = 422;
    res.json({success: false, message: err.message});
}
});



module.exports = userRouter;