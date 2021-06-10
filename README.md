# About
this is medical blog back-end application contains users , posts ,comments and reacts using node js

# deployed link
https://medical-blog001.herokuapp.com

# routes
## Users

post
/Api/Users/reg

### input example
{
    "username":"ahmed1",
    "email":"a1@a.com",
    "password":"12345678",
    "UserType":"Doctor"
}

post
Api/Users/login

input example
{
    "username":"ahmed1",
    "password":"12345678",
}


### all th next routes will need
### access_token : token
### in the headers

get
Api/Users/getUsers
Api/Users/MyPosts
Api/Users/myProfile

# posts

get
Api/Posts/getPost/:id

post
Api/Posts/addPost

### input example
{
    "title":"my 111111111111111 post",
    "PostBody":"my first postmy first postmy first postmy first postmy first postmy first post"
}

patch
Api/Posts/updatePost/:id

delete
Api/Posts/deletePost/:id

# comments

post
Api/Comments/addComment/:id

### input example
{
    "CommentBody":"CommentBodyCommentBodyCommentBodyCommentBodyCommentBodyCommentBodyCommentBody"
}

patch
Api/Comments/updateComment/:id/:cid

delete
Api/Comments/deleteComment/:id/:cid

# reacts

post
Api/Reacts/addReact/:id/

# input example
{
    "ReactType":"Angry"
}

patch
Api/Reacts/updateReact/:id/:rid

delete
Api/Reacts/deleteReact/:id/:rid


Ahmedsamy.Ahmedelsamy@gmail.com
