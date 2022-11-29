const express        = require('express');
const messageControl = require('../controllers/messageController');
const router         = express.Router();

// router.post("/messageform",messageControl.msgpostform);
router.get("/messageform",messageControl.msgform);
router.post("/messageform", messageControl.msgpostform);


module.exports = router;