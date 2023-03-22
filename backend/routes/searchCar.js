const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const Car = require('../models/car');
const User = require('../models/user');
const multer = require("multer");

// Get all cars

router.get('', (req, res, next) => {
  //mongoose model name
  Car.find() // return all result.
    .then(documents => {
      res.status(200).json({
        message: 'fetched successfully',
        data: documents,
      });
    });
});

module.exports = router;
