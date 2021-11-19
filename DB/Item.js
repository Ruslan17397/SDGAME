const mongoose = require('mongoose');

const item = new mongoose.Schema({
    name: {
        type: String
    },
    id: {
        type: String
    },
    texture: {
        type: String
    }
});

module.exports = Item = mongoose.model('item',item);