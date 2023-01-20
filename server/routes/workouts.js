const express = require('express');
const router = express.Router();
const example = require('../example')

// Load workouts controller
const workouts = require('../controllers/workouts.controllers')

// @route GET /test
// @description Tests workouts route with example strava data
router.get('/test', (req,res) => {
  setTimeout(() => {
    res.send(example)
  }, 3000)
})

// @route GET /
// @description Get all workouts for current month
router.get('/', workouts.getStravaData)

module.exports = router
