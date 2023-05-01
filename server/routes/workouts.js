const express = require('express');
const router = express.Router();
const example = require('../example')

// Load workouts controller
const workouts = require('../controllers/workouts');

// @route GET /test
// @description Tests workouts route with example strava data
router.get('/test', (req,res) => {
  setTimeout(() => {
    res.send(example)
  }, 3000)
})

// @route GET /
// @description Get all workouts since 2020
router.get('/', workouts.getAllWorkouts)

// @route GET /activity/:activityId
// @description Get detailed info for workout
router.get('/:id', async (req, res) => {
  const id = req.params.id
  workouts.getWorkoutData(id, res)
})

module.exports = router
