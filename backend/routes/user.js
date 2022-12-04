const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');
//api/user/signup
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      DOB: req.body.DOB,
      userType: req.body.userType,
      driverLicense: req.body.driverLicense,
      phone: req.body.phone
    });
    user
      .save()
      .then((result) => {
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

router.post('/login', (req, res, next) => {
  let fetchedUSer;
  User.findOne({
    email: req.body.email,
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      fetchedUSer = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }

      const token = jwt.sign(
        {
          email: fetchedUSer.email,
          userId: fetchedUSer._id,
        },
        'secret_this_should_be_longer',
        {
          expiresIn: '1h'
        }
      );
      res.status(200).json({
        token: token,
        user: fetchedUSer
      })
    })
    .catch(err => {
      return res.status(401).json({
        message: err,
      });
    });
});

module.exports = router;
