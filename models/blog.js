const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

//parameters for the model are the singular of the collection name, and the specific schema we want to use 
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;