const express = require('express')
const router = express.Router();
const Reservation = require("../models/reservation");

// Get all reservations
router.get('/', (req, res, next) => {
    //mongoose model name
    Reservation.find()// return all result.
      .then(documents => {
        res.status(200).json({
          message: 'fetched successfully',
          data: documents,
        });
      });
  });

  // Add new reservation
  router.post('/', (req, res, next) => {
    //mongoose model name
    const newReservation = new Reservation({
      userID : req.body.userID,
      carID : req.body.carID,
      fromDate : req.body.fromDate,
      toDate : req.body.toDate,
      location: req.body.location,
      price: req.body.price,
    });
    newReservation.save().then(result => {
      res.status(201).json({
        message: 'Car added successfully',
        postId: result._id
      });
    });
  });

  // Get reservation by ID
  router.get('/:id', (req, res, next) => {
    //mongoose model name
    Reservation.findById({ _id: req.params.id }).then(result => {
      res.status(201).json({
        message: 'Car fetched successfully',
        data: result
      })
  });
  });

  // Update reservation by ID
  router.post('/:id', (req, res, next) => {
    const updateReservation = {
      userID: req.body.userID,
      carID: req.body.carID,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      location: req.body.location,
      price: req.body.price,
    };
    //mongoose model name
    Reservation.findOneAndUpdate({ _id: req.params.id }, updateReservation).then(result => {
      res.status(201).json({
        message: 'Reservation updated successfully'
      })
  });
  });

  // Delete reservation by ID
  router.get('/delete/:id', (req, res, next) => {
    //mongoose model name
    Reservation.deleteOne({ _id: req.params.id }).then(result => {
        res.status(201).json({
          message: 'Reservation deleted successfully'
        })
    });
  });

  module.exports = router;

