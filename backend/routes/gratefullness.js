const router = require('express').Router();
let Gratefullnesses = require('../models/gratefullness.model');

router.route('/').get((req,res) => {
    Gratefullnesses.find()
        .then(gratefullness => res.json(gratefullness))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
    const gratefullness = req.body.gratefullness;
    const newGratefullness = new Gratefullnesses({gratefullness});

    newGratefullness.save()
        .then(() => {res.json('New gratefullness added!')})
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res) => {
    Gratefullnesses.findById(req.params.id)
        .then(gratefullness => res.json(gratefullness))
        .catch(err => res.send('Error with Gratefullness field: '+err));
});

router.route('/:id').delete((req,res) => {
    Gratefullnesses.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router