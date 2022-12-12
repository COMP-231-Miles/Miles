const express = require('express')
const router = express.Router();
const Policy = require("../models/policy");

// Get all policies
router.get('/', (req, res, next) => {
    //mongoose model name
    Policy.find()// return all result.
      .then(documents => {
        res.status(200).json({
          message: 'fetched successfully',
          data: documents,
        });
      });
  });

  // Add new policy
  router.post('/', (req, res, next) => {
    //mongoose model name
    const newPolicy = new Policy({
      title : req.body.title,
      description : req.body.description
    });
    newPolicy.save().then(result => {
      res.status(201).json({
        message: 'Policy added successfully',
        postId: result._id
      });
    });
  });

  // Get policy by ID
  router.get('/:id', (req, res, next) => {
    //mongoose model name
    Policy.findById({ _id: req.params.id }).then(result => {
      res.status(201).json({
        message: 'Policy fetched successfully',
        data: result
      })
  });
  });

  // Update reservation by ID
  router.post('/:id', (req, res, next) => {
    const updatePolicy = {
      title : req.body.title,
      description : req.body.description
    };
    //mongoose model name
    Policy.findOneAndUpdate({ _id: req.params.id }, updatePolicy).then(result => {
      res.status(201).json({
        message: 'Policy updated successfully'
      })
  });
  });

  // Delete policy by ID
  router.get('/delete/:id', (req, res, next) => {
    //mongoose model name
    Policy.deleteOne({ _id: req.params.id }).then(result => {
        res.status(201).json({
          message: 'Policy deleted successfully'
        })
    });
  });

  module.exports = router;

