const router = require('express').Router();
let Achievements = require('../models/achievements.model');

router.route('/').get((req,res) => {
    Achievements.find()
        .then(achievements => res.json(achievements))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
    const achievement = req.body.achievement;
    const newAchievement = new Achievements({achievement});

    newAchievement.save()
        .then(() => {res.json('New Achievement added!')})
        .catch(err => res.send('Error with Achievements field: '+err));
});

router.route('/:id').get((req,res) => {
    Achievements.findById(req.params.id)
        .then(achievements => res.json(achievements))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    Achievements.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
});


module.exports = router