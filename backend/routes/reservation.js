const express = require('express')
const router = express.Router();
const Reservation = require("../models/reservation");

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

  router.get('/:id', (req, res, next) => {
    //mongoose model name
    Reservation.deleteOne({ _id: req.params.id }).then(result => {
        res.status(201).json({
          message: 'Car deleted successfully'
        })
    });
  });

  module.exports = router;

