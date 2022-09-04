const express = require("express");
const app = express();


app.get("/",(req,res) => {
  res.send("hello from dfgdfgfgdfg nodemon")
})

app.listen(8082, () => {
  console.log("Server is up and running on port 8082! 🚀")
})