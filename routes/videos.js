const { json } = require("express")
const express = require("express")
const router = express.Router()
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")



function getAllVideoDetails() {

  // NON LOCAL ASYNC METHOD (MUST BE CHANGED TO ASYNC FUNCTION)
  // const response = await fetch(url, settings)
  // const body = await response.json()
  // return body

  // NON LOCAL METHOD (NO ASYNC FUNCTION)
  // return fetch(url, settings)
  //   .then(res => res.json())
  //   .then(response => {
  //     return response
  //   })

  // LOCAL METHOD
  return JSON.parse(fs.readFileSync("data/video-details.json"))
}

// regular console log
// console.log(getAllVideoDetails())

// ASYNC CONSOLE LOG
// getAllVideoDetails().then(res => console.log(res))

router.get("/",(req,res) => {
  console.log("all videos load")

  // NON LOCAL ASYNC METHOD (MUST BE CHANGED TO ASYNC FUNCTION)
  // const videoDetails = await getAllVideoDetails()
  // res.json(videoDetails)


  // NON LOCAL METHOD (NO ASYNC FUNCTION)
  // getAllVideoDetails()
  // .then(response => {
  //   res.json(response)
  // })
  // .catch(error => {
  //   console.log("error: ",error)
  // })

  // LOCAL METHOD
  res.json(getAllVideoDetails())
})

router.get("/:id",(req,res) => {
  console.log("single video load")

  // NON LOCAL ASYNC METHOD (MUST BE CHANGED TO ASYNC FUNCTION)
  // const singleVideoDetails = await getAllVideoDetails()
  // res.json(singleVideoDetails.find(video => video.id === req.params.id))

  // LOCAL METHOD
  const singleVideoDetails = getAllVideoDetails().find(video => video.id === req.params.id);
  res.json(singleVideoDetails)
})

router.post("/",(req,res) => {
  console.log("posted a new video")
  if (!req.body.title || !req.body.description) {
    return res
      .status(400)
      .json({ error: 'Missing title or description'})
  }

  const newVideo = {
    "id": uuidv4(),
    "title": req.body.title,
    "channel":"Ash Ketchum",
    "image":"",
    "description":req.body.description,
    "views":"1,234,567",
    "likes":"123,456",
    "duration":"1:23",
    "video":"https://project-2-api.herokuapp.com/stream",
    "timestamp": Date.now(),
    "comments": []
  };

  const currentVideos = getAllVideoDetails();
  currentVideos.push(newVideo)
  fs.writeFileSync("data/video-details.json",JSON.stringify(currentVideos))
  res.json(currentVideos);
})


// Diving deeper
router.post("/:id/comments",(req,res) => {
  console.log("posted a new comment for a specified video")

})

router.post("/:id/comments/:commentId",(req,res) => {
  console.log("deleted a comment")

})

 
module.exports = router