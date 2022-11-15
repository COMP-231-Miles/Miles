const express = require('express');

const router = express.Router();
const Test = require('../models/test');
const checkAuth = require('../middleware/check-auth');
//This is example code, it will be deprecated sooner or later
router.post('', (req, res, next) => {
  const post = new Test({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'post added successfully',
      postId: result._id
    });
  });
});
//This is example code, it will be deprecated sooner or later
router.get('', (req, res, next) => {
  //mongoose model name
  Test.find()// return all result. 
    .then(documents => {
      res.status(200).json({
        message: 'fetched successfully',
        data: documents,
      });
    }); 
});

router.delete('/:id', (req, res, next) => {
  Test.deleteOne({_id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'test item deleted'})
  })
});

router.put('/:id', (req, res, next) => {
  const post = new Test({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Test.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Updated successful!'});
  })
});
//example of adding authentication for api
// router.post('', checkAuth, (req, res, next) => {
//   const post = new Test({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   post.save().then(result => {
//     res.status(201).json({
//       message: 'post added successfully',
//       postId: result._id
//     });
//   });
// });

module.exports = router;