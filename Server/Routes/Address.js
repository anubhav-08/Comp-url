const express = require('express');
const router = express.Router();
const addressView = require('../Views/Address')
const auth = require('../Middleware/auth')
// create short url against long one (authentication needed)
router.post('/store', auth.authenticate, addressView.storeLong);

// list all urls created by user (authentication needed)
router.get('/addresses', auth.authenticate, addressView.listAll);

// return long url mapped to short url
router.get('/:id', addressView.shortToLong);

module.exports = router;