const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT
const cors = require("cors")
const fs = require("fs")

const videoRoutes = require("./routes/videos")


app.use(cors())
app.use(express.json())

app.use("/static",express.static("public"))
app.use("/videos",videoRoutes)

// TEST
app.get("/",(req,res) => {
  res.send("test hello from home")
})

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})