const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes/image.js');
// var multer = require('multer'); 
// var upload = multer({dest : 'compress_images/'});
var bodyParser = require('body-parser')
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
const app = express();
app.use(express.json()); // Make sure it comes back as json
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(upload.array()); 
// app.use(express.static('public'));
 
// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://user_31:CdwwZiT8XiHYnHN7@cluster0.phezd.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
}).then(() =>{
    console.log("connected");
});

app.use(Router);

app.listen(8000, () => { console.log('Server is running...') });
