const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');


router.get('/:username', UsersCtrl.getUsernamePage);

module.exports = router;
