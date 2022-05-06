const express = require('express');
const router = express.Router();
const votingController = require('../controllers/VotingController');

router.route('/').get(votingController.getAll);
router.route('/createVoting').post(votingController.createVoting);

module.exports = router;
