const mongoose = require('mongoose');
//_________________________________________________________________________
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
//_________________________________________________________________________
/////////////check if connected to db or no ///////////////
mongoose.connect(process.env.DB , 
{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to MongodDB ...'))
    .catch((err) => console.error('can not connect to MongoDB', err))
//_________________________________________________________________________
