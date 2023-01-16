const express = require("express");
let axios = require("axios");
var app = express();
const { processData } = require("./data_processors");
const ExpressError = require("./expressError");

app.use(express.json());

app.post("/", async function (req, res, next) {
  try {
    const developers = req.body.developers;

    const rawDeveloperData = getRawDeveloperDataFromGithub(developers);
    const processedData = processData(rawDeveloperData);

    return res.json(processedData);
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
  console.log(err);
  return res.status(status).json({
    error: { message, status },
  });
});

async function getRawDeveloperDataFromGithub(developers) {
  const promises = developers.map((developer) => {
    return axios.get(`https://api.github.com/users/${developer}`);
  });

  return (await Promise.allSettled(promises)).filter(
    (r) => r.status === "fulfilled"
  );
}
module.exports = app;
