const Post = require('../Models/Post')
//____________________________________________________________________________________________________________________________________
exports.Myposts= async(arrayofposts)=>{
    var myposts = [];
    for(i=0;i<arrayofposts.length;i++)
    {   
        const post = myposts.push(await Post.findById(arrayofposts[i]))
    }
    return  myposts;
}   
//____________________________________________________________________________________________________________________________________
exports.deleteMyposts= async(arrayofposts)=>{
    for(i=0;i<arrayofposts.length;i++)
    {   
        await Post.findByIdAndDelete(arrayofposts[i])
    }
}   