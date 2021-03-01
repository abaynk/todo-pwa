const router = require('express').Router();
let Schedule = require('../models/schedule.model');

router.route('/').get((req,res) => {
    Schedule.find()
        .then(schedule => res.json(schedule))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
    const schedule = req.body.schedule;
    const time = req.body.time;

    const newSchedule = new Schedule({schedule,time});

    newSchedule.save()
        .then(() => {res.json('New scheduled task added!')})
        .catch(err => res.send('Error with Schedules field: '+err));
});

router.route('/:id').get((req,res) => {
    Schedule.findById(req.params.id)
        .then(schedule => res.json(schedule))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    Schedule.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
});


module.exports = router