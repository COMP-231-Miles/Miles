const express = require('express')
const router = express.Router();
const Car = require("../models/car");


// Get all cars

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

  // Add a new car
  router.post('', (req, res, next) => {
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



  // Delete car by ID
  router.get('/delete/:id', (req, res, next) => {
    //mongoose model name
    Car.deleteOne({ _id: req.params.id }).then(result => {
        res.status(201).json({
          message: 'Car deleted successfully'
        })
    });
  });

  
// Get car by ID
  router.get('/:id', (req, res, next) => {
    //mongoose model name
    Car.findById({ _id: req.params.id }).then(result => {
        res.status(201).json({
          message: 'Car fetched successfully',
          data: result
        })
    });
  });

    // Update car by ID
    router.post('/:id', (req, res, next) => {
      const updateCar = {
        name: req.body.name,
        type: req.body.type,
        passengers: req.body.passengers,
        price: req.body.price,
        luggage: req.body.luggage,
        isAuto: req.body.isAuto,
        ACsup: req.body.ACsup,
        pickupLoc: req.body.pickupLoc,
        insurance: req.body.insurance,
        imageName: req.body.imageName,
        isAvailable: req.body.isAvailable,
        };

      //mongoose model name
      Car.findOneAndUpdate({ _id: req.params.id }, updateCar).then(result => {
        res.status(201).json({
          message: 'Car updated successfully'
        })
    });
    });

  module.exports = router;

