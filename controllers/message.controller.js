//Dependencies
const path = require('path');
const Message = require(path.join(__dirname, '..', 'models', 'message.model'));

//Modules
module.exports = {
    create: async(req, res) => {
        if (req.body.content && req.body.title) {
            const createMessage = new Message({
                title: req.body.title,
                content: req.body.content
            });
            try {
                const data = await createMessage.save();
                res.send(data);
            } catch (error) {
                res.status(500).send({
                    message: error.message
                });
            }
        } else {
            return res.status(400).send({
                message: "Missing parameters!"
            });
        }
    },
    findAll: async(req, res) => {
        try {
            const allMessage = await Message.find();
            res.send(allMessage);
        } catch (error) {
            res.status(500).send({
                message: error.message
            });
        }
    },
    findOne: async(req, res) => {
        try {
            const findMessage = await Message.findById(req.params.messageId);
            if (!findMessage) {
                return res.status(404).send({
                    message: "Message not found with id: " + req.params.messageId
                });            
            } else {
                res.send(findMessage);
            }
        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        }
    },
    update: async(req, res) => {
        if (req.body.content && req.body.title) {
            try {
                const updateMessage = await Message.findByIdAndUpdate(req.params.messageId, {
                    title: req.body.title,
                    content: req.body.content
                }, {new: true});
                if (!updateMessage) {
                    return res.status(404).send({
                        message: "Message not found with id: " + req.params.messageId
                    });
                } else {
                    res.send(updateMessage);
                }
            } catch (error) {
                return res.status(500).send({
                    message: error.message
                });
            }
        } else {
            return res.status(400).send({
                message: "Missing parameters!"
            });
        }
    },
    delete: async(req, res) => {
        try {
            const deleteMessage = await Message.findByIdAndRemove(req.params.messageId);
            if (!deleteMessage) {
                return res.status(404).send({
                    message: "Message not found with id: " + req.params.messageId
                });
            } else {
                res.send({message: "Message deleted successfully!"});
            }
        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        }
    }
}
