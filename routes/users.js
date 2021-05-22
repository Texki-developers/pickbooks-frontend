const { response } = require('express');
var express = require('express');
const { getNewUploadedBooks } = require('../Helpers/userHelpers');
var router = express.Router();
var userHelpers = require('../Helpers/userHelpers')
/* GET users listing. */
router.get('/get-home-books', function(req, res, next) {
  console.log('in route');
  userHelpers.getNewUploadedBooks()
     .then(newBooks => {
       userHelpers.getMostViewedBooks()
        .then(mostViewedBooks=>{
          console.log(newBooks,"newBooks");
          res.json(
            {
              newBooks:newBooks,
              mostViewedBooks:mostViewedBooks
            }).catch(err =>{
              res.json({status:false})
              console.log(err);
            })
       })
    })
});

router.get('/checkuser',(req,res)=>{
  if(req.session.userData){
    // console.log(req.session.user);
    res.json({status:true,data:req.session.userData})
  }else{

    res.json({status:false,data:null})
  }
})
router.post('/add-book',(req,res) => {
    // console.log(req.body);
    userHelpers.addBook(req.body).then(statusMessage => {
      res.json({status:statusMessage})
    })
})


router.post('/login',(req,res)=>{
  // console.log(req.body);
  userHelpers.addUser(req.body).then(data=>{
    req.session.userData = data
    // console.log(req.session.userData);
    res.json({data:data})
  })
})

router.get('/getallbooks',(req,res)=>{
  userHelpers.getAllBook().then(data=>{
    res.json(data)
  })
})

router.get('/getonebook/:id',(req,res)=>{
  // console.log(req.params.id);
  userHelpers.getOneBook(req.params.id).then(data=>{
    res.json(data)
  })
})

router.get('/reviews/:id',(req,res) => {
  userHelpers.getReviews(req.params.id).then((reviews) => {
    console.log("reviews",reviews);
    res.json(reviews);
  }).catch((err) => {
    console.log("some errro ;;;;;;;;;;;;;;;;;;;;",err);
  })
})

router.post('/add-comment',(req,res) => {
  console.log("review in route",req.body);
  userHelpers.addReview(req.body).then((message)=>{
    res.json({message})
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.json({status:true})
})
module.exports = router;
