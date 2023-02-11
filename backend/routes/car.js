const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const Car = require('../models/car');
const User = require('../models/user');

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

router.get('/owner', async (req, res, next) => {
  const user = await checkAndReturUser(req);
  //mongoose model name
  Car.find({
    user: user._id,
  }) // return all result.
    .then(documents => {
      res.status(200).json({
        message: 'fetched successfully',
        data: documents,
      });
    });
});

// Add a new car
router.post('', async (req, res, next) => {
  // Add some car add validation
  const user = await checkAndReturUser(req);
  let errors = [];
  if (!req.body.name) {
    errors.push('Car name is required!');
  }
  if (!req.body.type) {
    errors.push('Car type is required!');
  }
  if (!req.body.passengers) {
    errors.push('Car passengers seat number is required!');
  }
  if (!req.body.price) {
    errors.push('Car Price Per day is required!');
  }

  if (errors.length > 0) {
    return res.status(403).json({
      message: 'Invalid! ',
      data: { errors: errors },
    });
  }
  //mongoose model name
  const carToAdd = new Car({
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
    user: user._id,
  });
  carToAdd.save().then(result => {
    res.status(201).json({
      message: 'Car added successfully',
      postId: result._id,
      car: result,
    });
  });
});

// Delete car by ID
router.get('/delete/:id', async (req, res, next) => {
  //mongoose model name
  const user = await checkAndReturUser(req);

  const car = await Car.findOne({ _id: req.params.id });
  if (!car) {
    res.status(404).json({
      message: 'Car not found',
      data: { errors: 'Invalid Car Id' },
    });
  }
  const carOfUser = await Car.findOne({ _id: req.params.id, user: user._id });
  if (!carOfUser) {
    res.status(401).json({
      message: 'UnAuthorized',
      data: { errors: 'User doesnot have access to delete this car' },
    });
  }
  Car.deleteOne({ _id: req.params.id }).then(result => {
    res.status(201).json({
      message: 'Car deleted successfully',
    });
  });
});

// Get car by ID
router.get('/:id', (req, res, next) => {
  //mongoose model name
  Car.findById({ _id: req.params.id }).then(result => {
    res.status(201).json({
      message: 'Car fetched successfully',
      data: result,
    });
  });
});

// Update car by ID
router.post('/:id', async (req, res, next) => {
  const user = await checkAndReturUser(req);

  const car = await Car.findOne({ _id: req.params.id });
  if (!car) {
    res.status(404).json({
      message: 'Car not found',
      data: { errors: 'Invalid Car Id' },
    });
  }
  const carOfUser = await Car.findOne({ _id: req.params.id, user: user._id });
  if (!carOfUser) {
    res.status(401).json({
      message: 'UnAuthorized',
      data: { errors: 'User doesnot have access to update this car' },
    });
  }
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

  console.log('In the update car');
  console.log(updateCar);
  console.log({ _id: req.params.id });
  //mongoose model name
  const updatedCar = await Car.findOneAndUpdate(
    { _id: req.params.id },
    updateCar
  );
  console.log(updatedCar);
  return res.status(201).json({
    message: 'Car updated successfully',
    car: await Car.findOne({ _id: req.params.id }),
  });
});

const checkAndReturUser = async req => {
  //Validation
  if (!req.user || req.user == null) {
    return res.status(403).json({
      message: 'Invalid! ',
      data: { errors: ['Not Loggged in user'] },
    });
  }

  const user = await User.findOne({ email: req.user });

  if (!user) {
    return res.status(403).json({
      message: 'Invalid! ',
      data: { errors: ['Not Loggged in user'] },
    });
  }
  return user;
};

module.exports = router;
