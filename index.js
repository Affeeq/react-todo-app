const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");

// DB_URl = online db url
const dbUrl = process.env.DB_URL;
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to ${dbUrl}`);
  })
  .catch((err) => {
    console.log("ERROR", err.message);
  });

const { json, urlencoded } = express;
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

app.use("/api", router);

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/*", (req, res) => {
  console.log("app.get(/*) called!");
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


module.exports = app;