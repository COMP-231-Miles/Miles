const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const Car = require('../models/car');
const User = require('../models/user');
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

//Add a car
router.post('', multer({ storage: storage }).single("image"),
async (req, res, next) => {
  // Add some car add validation
  const url = req.protocol + "://" + req.get("host");
  const user = req.body.user;
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
  console.log(req.body)
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
    image: url + "/images/" + req.file.filename,
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
  // const user = await checkAndReturUser(req);
  const user = req.user;
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

// Delete car by ID
router.delete('/delete/:id', async (req, res, next) => {
  //mongoose model name
  // const user = await checkAndReturUser(req);

  const car = await Car.findOne({ _id: req.params.id });
  if (!car) {
    res.status(404).json({
      message: 'Car not found',
      data: { errors: 'Invalid Car Id' },
    });
  }
  // const carOfUser = await Car.findOne({ _id: req.params.id });
  // if (!carOfUser) {
  //   res.status(401).json({
  //     message: 'UnAuthorized', 
  //     data: { errors: 'User doesnot have access to delete this car' },
  //   });
  // }
  Car.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
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

  //mongoose model name
  const updatedCar = await Car.findOneAndUpdate(
    { _id: req.params.id },
    updateCar
  );
  return res.status(201).json({
    message: 'Car updated successfully',
    car: await Car.findOne({ _id: req.params.id }),
  });
});

const checkAndReturUser = async req => {
  //Validation
  if (!req.body.user || req.body.user == null) {
    return res.status(403).json({
      message: 'Invalid! ',
      data: { errors: ['Not Loggged in user'] },
    });
  }

  const user = await User.findOne({ email: req.body.user });
  if (!user) {
    return res.status(403).json({
      message: 'Invalid! ',
      data: { errors: ['Not Loggged in user'] },
    });
  }
  return user;
};

module.exports = router;
