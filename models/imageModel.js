// CdwwZiT8XiHYnHN7
// mongodb+srv://user_31:<password>@cluster0.phezd.mongodb.net/<dbname>?retryWrites=true&w=majority

const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name : String,
    image: { data: Buffer, contentType: String }
});

const images = mongoose.model('Images_schema',imageSchema);
module.exports = images;