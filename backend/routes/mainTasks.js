const router = require('express').Router();
let MainTask = require('../models/mainTasks.model');

router.route('/').get((req,res) => {
    MainTask.find()
        .then(mainTasks => res.json(mainTasks))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
    const mainTask = req.body.mainTask;
    const newMainTask = new MainTask({mainTask});

    newMainTask.save()
        .then(() => {res.json('New Main Task added!')})
        .catch(err => res.send('Error with Main Tasks field: '+err));
});

router.route('/:id').get((req,res) => {
    MainTask.findById(req.params.id)
        .then(mainTasks => res.json(mainTasks))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    MainTask.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;