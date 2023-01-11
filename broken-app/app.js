const express = require('express');
let axios = require('axios');
var app = express();

const ExpressError = require("./expressError")

app.use(express.json());


app.post('/', async function (req, res, next) {
  try {
    let developers = req.body.developers;
    let returnData = []
    for (let d of developers) {
      result = await axios.get(`https://api.github.com/users/${d}`);
      returnData.push({ "name": result.data.name, "bio": result.data.bio })
    }
    return res.json(returnData);
  } catch (err) {
    return next(err);
  }
});

//respond with a 404 if no routing matches
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
});

//global error handler 
app.use(function (err, req, res, next) {

  let status = err.status || 500;
  let message = err.msg;
  console.log(err)
  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});

