const TestActivity = require('../models/testingMongoModel')

const TestingController = {
  GetTest: async (req, res) => {
    const workouts = await TestActivity.find()

    console.log('testcontroller')
    res.send(workouts)
  },

  AddTest: async (req, res) => {
    const { stravaId, name } = req.body
    console.log(req.body)

    const newWorkout = new TestActivity({ stravaId, name })
    await newWorkout.save()

    res.send(newWorkout)
  },
}

module.exports = TestingController