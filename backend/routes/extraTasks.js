const router = require('express').Router();
let ExtraTask = require('../models/extraTasks.model');

router.route('/').get((req,res) => {
    ExtraTask.find()
        .then(extraTasks => res.json(extraTasks))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
    const extraTask = req.body.extraTask;
    const newExtraTask = new ExtraTask({extraTask});

    newExtraTask.save()
        .then(() => {res.json('New extra Task added!')})
        .catch(err => res.send('Error with Extra Tasks field: '+err));
});

router.route('/:id').get((req,res) => {
    ExtraTask.findById(req.params.id)
        .then(extraTasks => res.json(extraTasks))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    ExtraTask.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
});


module.exports = router