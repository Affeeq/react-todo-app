const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");

// DB_URl = online db url
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/todo";
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
app.use("/api", router);

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server running on port ${process.env.PORT || 8000}`);
});
module.exports = app;


// const uri = "mongodb+srv://Affeeq:<password>@cluster0.qkdor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });