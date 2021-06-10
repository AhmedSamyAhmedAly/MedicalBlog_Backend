exports.checkAuthorization = (id,user) => {
    var flag = {find:false,index:false}
    for(i=0;i<user.posts.length;i++)
        {   
            if(user.posts[i]==id)  flag = {find:true,index:i}
        }
        return flag ;
}
//____________________________________________________________________________________________________________________________________
exports.findComment = (commentID,post) => {
    var flag = {find:false,index:false}
    for(i=0;i<post.comments.length;i++)
    {   
        if(post.comments[i].id==commentID)  flag = {find:true,index:i}
    }
    return flag ;
}
//____________________________________________________________________________________________________________________________________
exports.findReact = (reactID,post) => {
    var flag = {find:false,index:false}
    for(i=0;i<post.Reacts.length;i++)
    {   
        if(post.Reacts[i].id==reactID)  flag = {find:true,index:i}
    }
    return flag ;
}//____________________________________________________________________________________________________________________________________