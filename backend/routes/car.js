const express = require('express')
const router = express.Router();
const Car = require("../models/car");

router.get('', (req, res, next) => {
    //mongoose model name
    Car.find()// return all result.
      .then(documents => {
        res.status(200).json({
          message: 'fetched successfully',
          data: documents,
        });
      });
  });

  router.post('/reserve', (req, res, next) => {
    //mongoose model name
    const carToAdd = new Car({
      name:req.body.name,
      type:req.body.type,
      passengers:req.body.passengers,
      price:req.body.price,
      luggage:req.body.luggage,
      isAuto:req.body.isAuto,
      ACsup:req.body.ACsup,
      pickupLoc:req.body.pickupLoc,
      insurance:req.body.insurance,
      imageName:req.body.imageName,
      isAvailable:req.body.isAvailable
    });
    carToAdd.save().then(result => {
      res.status(201).json({
        message: 'Car added successfully',
        postId: result._id
      });
    });
  });

  router.get('/:id', (req, res, next) => {
    //mongoose model name
    Car.deleteOne({ _id: req.params.id }).then(result => {
        res.status(201).json({
          message: 'Car deleted successfully'
        })
    });
  });

  module.exports = router;

