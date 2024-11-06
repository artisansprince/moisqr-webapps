const objectModel = require('../models/objectModel');

exports.createObject = async (req, res) => {
    try {
        const { name, description, image_url, location } = req.body;
        const id = await objectModel.create(name, description, image_url, location);
        res.status(201).json({ message: 'Object created', id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create object' });
    }
};

exports.getAllObjects = async (req, res) => {
    try {
        const objects = await objectModel.findAll();
        res.status(200).json(objects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch objects' });
    }
};


exports.getObjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const object = await objectModel.findById(id);

        if (object) {
            res.status(200).json(object);
        } else {
            res.status(404).json({ error: 'Object not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch object' });
    }
};


exports.updateObject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image_url, location } = req.body;
        await objectModel.update(id, name, description, image_url, location);
        res.status(200).json({ message: 'Object updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update object' });
    }
};

exports.deleteObject = async (req, res) => {
    try {
        const { id } = req.params;
        await objectModel.delete(id);
        res.status(200).json({ message: 'Object deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete object' });
    }
};
