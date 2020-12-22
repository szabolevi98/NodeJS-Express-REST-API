//Dependencies
const router = require('express').Router();
const path = require('path');
const messages = require(path.join(__dirname, '..', 'controllers', 'message.controller'));

//Route messages
router.get('/', messages.findAll); //Get all messages
router.post('/', messages.create); //Create a new message
router.get('/:messageId', messages.findOne); //Get a message with messageId
router.put('/:messageId', messages.update); //Update a message with messageId
router.delete('/:messageId', messages.delete); //Delete a message with messageId

module.exports = router;
