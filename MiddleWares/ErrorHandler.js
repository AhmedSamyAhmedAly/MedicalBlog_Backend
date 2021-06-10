const express = require('express');
const app = express();

//__________________________________________________________________________

//log the srver error
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send({ error: 'internal server error' })
    next(err);
  });