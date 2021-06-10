require('./DBConnection/MongoDB')
require('dotenv').config();
//__________________________require main libs______________________
const express = require('express');
const cors = require('cors');
const Users = require('./Routes/User')
const Posts = require('./Routes/Post')
const Comments = require('./Routes/Comments')
const Reacts = require('./Routes/Reacts')


const authenticationMiddleware = require('./MiddleWares/Authentication');

//_________________using express___________________________________
const app = express();
app.use(express.static('public')); 
app.use(cors())      
app.use(express.json()); 

//_______________________APIs_____________________________________

app.use('/Api/Users',Users)
app.use('/Api/Posts',authenticationMiddleware,Posts)
app.use('/Api/Comments',authenticationMiddleware,Comments)
app.use('/Api/Reacts',authenticationMiddleware,Reacts)


//_______________________port configuration_______________________
app.listen(process.env.PORT || 3000,() =>{
    console.info("Server now listen on PORT 3000");
})