const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');

const Cards = require('../models/cards');
const Entries = require('../models/entries');

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = new RateLimit({
    windowMs: minutes * 60 * 1000, // milliseconds
    max: 1000, // Limit each IP to 100 requests per windowMs
    delayMs: 0, // Disable delaying - full speed until the max limit is reached
    handler: (req, res) => {
        res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
    }
});



// READ (ALL)
router.get('/', (req, res) => {
    Promise.all([Cards.find({}), Entries.find({})])
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
});


// CREATE Card
router.post('/card/:id', postLimiter, (req, res) => {



    let newCard = new Cards({
        name: req.body.name,
        id: req.params.id
    });


    newCard.save()
        .then((result) => {
            res.json({
                success: true,
                msg: `Successfully added!`,
                result: {
                    _id: result._id,
                    id: result.id,
                    name: result.name
                }
            });
        })
        .catch((err) => {
            if (err.errors) {
                if (err.errors.name) {
                    res.status(400).json({ success: false, msg: err.errors.name.message });
                    return;
                }
                // Show failed if all else fails for some reasons
                res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            }
        });
});

// CREATE Entry
router.post('/entry/:idCard/:idEntry', postLimiter, (req, res) => {

    let newEntry = new Entries({
        name: req.body.name,
        idCard: req.params.idCard,
        idEntry: req.params.idEntry
    });

    newEntry.save()
        .then((result) => {
            res.json({
                success: true,
                msg: `Successfully added!`,
                result: {
                    _id: result._id,
                    name: result.name,
                    idCard:result.idCard,
                    idEntry:result.idEntry
                }
            });
        })
        .catch((err) => {
            if (err.errors) {
                if (err.errors.name) {
                    res.status(400).json({ success: false, msg: err.errors.name.message });
                    return;
                }
                // Show failed if all else fails for some reasons
                res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            }
        });
});

// UPDATE CARD
router.put('/card/:id/:value', (req, res) => {

    let updatedCard = {
        name: req.params.value,
        id: req.params.id
    };

    if (req.params.value=='empty') {
        updatedCard.name = ''
    }

    Cards.findOneAndUpdate({ id: req.params.id }, updatedCard, { runValidators: false, context: 'query' })
        .then((oldResult) => {
            Cards.findOne({ id: req.params.id })
                .then((newResult) => {
                    res.json({
                        success: true,
                        msg: `Successfully updated!`,
                        result: {
                            _id: newResult._id,
                            name: newResult.name,
                            id: newResult.id
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
                    return;
                });
        })
        .catch((err) => {
            if (err.errors) {
                if (err.errors.name) {
                    res.status(400).json({ success: false, msg: err.errors.name.message });
                    return;
                }

                // Show failed if all else fails for some reasons
                res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            }
        });
});

// UPDATE ENTRY
router.put('/entry/:id/:value', (req, res) => {


    let updatedEntry = {
        name: req.params.value,
        idEntry: req.params.id
    };
    if (req.params.value=='empty') {
        updatedEntry.name = ''
    }

    Entries.findOneAndUpdate({ idEntry: req.params.id }, updatedEntry, { runValidators: false, context: 'query' })
        .then((oldResult) => {
            Entries.findOne({ idEntry: req.params.id })
                .then((newResult) => {
                    res.json({
                        success: true,
                        msg: `Successfully updated!`,
                        result: {
                            _id: newResult._id,
                            name: newResult.name,
                            idEntry: newResult.idEntry
                        }
                    });
                })
                .catch((err) => {
                    res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
                    return;
                });
        })
        .catch((err) => {
            if (err.errors) {
                if (err.errors.name) {
                    res.status(400).json({ success: false, msg: err.errors.name.message });
                    return;
                }

                // Show failed if all else fails for some reasons
                res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            }
        });
});


// DELETE CARD
router.delete('/card/:id', (req, res) => {

    Cards.find({id:req.params.id}).remove().exec()
        .then((result) => {
            res.json({
                success: true,
                msg: `It has been deleted.`,
                result: {
                    _id: result._id,
                    id: result.id,
                    name: result.name
                }
            });
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: 'Nothing to delete.' });
        });


    Entries.find({idCard: req.params.id}).remove().exec()
        .then((result) => {
            console.log('/???')
            res.json({
                success:true,
                msg: 'All entries with this idCard has been deleted.'
            })
        })
        .catch((err) => {
            res.status(404).json({ success: false, msg: 'All entries hasnotbeendeleted.' });
        });
});

// DELETE ENTRY
router.delete('/entry/:id', (req, res) => {

    Entries.find({idEntry: req.params.id}).remove().exec()
        .then((result) => {
            res.json({
                success: true,
                msg: `It has been deleted.`,
                result: {
                    _id: result._id,
                    idCard: result.idCard,
                    idEntry: resul.idEntry,
                    name: result.name
                }
            });
        })

});



// DELETE ALL

router.delete('/deleteall', (req, res) => {
    Entries.remove({}, function(err) {
        if (err) {
            console.log(err)
        } else {
            res.end('success');
        }
    }
    );
    Cards.remove({}, function(err) {
        if (err) {
            console.log(err)
        } else {
            res.end('success');
        }
    }
    );
})


module.exports = router;
