const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');
//api/user
router.get('', (req, res, next) => {
  //mongoose model name
  User.find() // return all result.
    .then(user => {
      res.status(200).json({
        message: 'user fetched successfully',
        data: user,
      });
    });
});

//api/user/signup
router.post('/signup', (req, res, next) => {
  console.log(req.body.userType);
  if (!['ADMIN', 'USER', 'OWNER'].includes(req.body.userType)) {
    return res.status(401).json({
      message: 'Error',
      result: { errors: ['User Role Can be only USER or OWNER'] },
    });
  }
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      DOB: req.body.DOB,
      userType: req.body.userType,
      driverLicense: req.body.driverLicense,
      phone: req.body.phone,
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'User Created!',
          result: result,
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log('user', user);
    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log('validPassword');

    if (!validPassword) {
      console.log('validPassword in if');

      return res.status(400).json({
        message: 'wrong password',
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userType: user.userType,
        userId: user._id,
      },
      'secret_this_should_be_longer',
      {
        expiresIn: '1h',
      }
    );
    console.log(token);
    res.status(200).json({
      token: token,
      user: user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res, next) => {
  //mongoose model name
  User.findById({ _id: req.params.id }).then(result => {
    res.status(201).json({
      message: 'User fetched successfully',
      data: result,
    });
  });
});

//update user info
router.put('/userInfo/:id', async (req, res, next) => {
  const updatedUser = new User({
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    address: req.body.address,
  });
  const user = User.findById(req.body._id);
  if (!user) return res.status(404).send('User not found');
  await User.findByIdAndUpdate(req.body._id, updatedUser, { new: true }).then(
    result => {
      console.log('userInfo called');
      res.status(200).json({
        message: 'Updated successful!',
        data: result,
      });
    }
  );
});
//update driver license
router.put('/driverLicense/:id', async (req, res, next) => {
  const updatedDriverLicense = new User({
    _id: req.body._id,
    driverLicense: req.body.driverLicense,
  });
  const user = User.findById(req.body._id);
  if (!user) return res.status(404).send('User not found');
  await User.findByIdAndUpdate(req.body._id, updatedDriverLicense, {
    new: true,
  }).then(result => {
    res.status(200).json({
      message: 'Updated driver license successful!',
      data: result,
    });
  });
});

//reset password
router.put('/resetPassword/:id', async (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const updatedPassword = new User({
      _id: req.body._id,
      password: hash,
    });
    const user = User.findById(req.body._id);
    if (!user) return res.status(404).send('User not found');
    User.findByIdAndUpdate(req.body._id, updatedPassword, { new: true }).then(
      result => {
        console.log('resetPassword called');

        res.status(200).json({
          message: 'Updated password successful!',
          data: result,
        });
      }
    );
  });
});

module.exports = router;
