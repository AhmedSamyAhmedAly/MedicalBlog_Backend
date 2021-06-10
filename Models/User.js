const mongoose = require('mongoose');

// user model

const UserSchema = new mongoose.Schema({
           username: {    type: String,
                        min: 3,
                        max: 30,
                        lowercase: true,
                        required: [true, "Username be blank"],
                        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
                        index: true
                    },
        password:{
            type: String,
            required: true
        },
        email: {    type: String,
                    lowercase: true,
                    unique: true,
                    required: [true, "Email can't be blank"], 
                    match: [/\S+@\S+\.\S+/, 'is invalid'], 
                    index: true
                },

        Userimage: {
         type:String
        },

        UserType: {
            type:String,
            default:"user",
            enum:["user","Doctor"]
           },

        posts: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Posts"
        }]


}
, {timestamps: true}
)

const User = mongoose.model('User', UserSchema);
module.exports = User;