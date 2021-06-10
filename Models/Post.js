const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },

    title:{
        type:String,
         min: 1,maxlength:50,
         required: [true, "title can't be blank"], 
    },
    PostBody :{
         type: String,
         min: 5,
         maxlength:500,
         required: [true, "body can't be blank"], 
    },
  
    comments: [{
        username: String,
        CommentBody :{
            type: String,
            min: 5,
            maxlength:500,
            required: [true, "body can't be blank"], 
       },
       date: {type: Date, default: Date.now},
    }],

    Reacts: [{
        username: String,
        ReactType :{
            type:String,
            default:"none",
            enum:["none","Like","Love","Angry","Sad"]
       },
       date: {type: Date, default: Date.now},
    }]


}
, {timestamps: true}
)

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
