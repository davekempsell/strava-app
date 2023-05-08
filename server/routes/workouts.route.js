const router = require('express').Router();
// Load workouts controller
const WorkoutsController = require('../controllers/workouts.controller');


// @route GET /
// @description Get all workouts since 2020
router.get('/get-workouts', WorkoutsController.getWorkouts)

// router.post('/workout/addWorkouts', workouts.addWorkouts)


module.exports = router
