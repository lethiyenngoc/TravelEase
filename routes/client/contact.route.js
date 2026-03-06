const router = require('express').Router();

const contactController = require("../../controllers/client/contact.controller");

router.get('/', contactController.index);
router.post('//subscribe', contactController.createPost);

module.exports = router;