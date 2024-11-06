const express = require('express');
const objectController = require('../controllers/objectController');
const router = express.Router();

router.post('/create', objectController.createObject);
router.get('/get-all', objectController.getAllObjects);
router.get('/get-by-id', objectController.getObjectById);
router.put('/update/:id', objectController.updateObject);
router.delete('/delete/:id', objectController.deleteObject);

module.exports = router;
