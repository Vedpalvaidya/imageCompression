const sharp = require("sharp")
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const images = require("../models/imageModel");

var multer = require('multer'); 
var upload = multer({dest : '../images/'});

app.post('/',upload.single('avatar'), async (req, res) => {
    // const obj1 = JSON.parse(JSON.stringify(req.body));
    // console.log(req.file.path, req.body)
    console.log("aaaaaaaaaaaaaaaaaaaaaa")
    // path1 = path.join(__dirname , '../images')
    path2 = path.join(__dirname , '../compress_images')

    // async () => {
    // await fs.readdir(path1, (err, files) =>{
    //     if(err){
    //         return console.log("Unable to scan directory" + err);
    //     }
    //     else{
    //         processImages(files[0]);
    //     }
    // })
    console.log(req.file)

    // const processImages = async (file) => {
        try {
            // image_path = path.join(req.file.path, f);
            comrpess_path = path.join(path2, req.file.originalname)
            // // console.log(req.body);
            var info = await sharp(req.file.path).resize(200, 200).jpeg().toFile(comrpess_path);

            var obj = {
                name : "aa",
                image : {
                    data: comrpess_path,
                    contentType : '/image/jpeg'
                }
            }
            images.create(obj, (err, item) => {
                if(err) throw err;
                console.log(info);   
            })
            res.status(200).jsonp({
                status: 'sucess',
                data : info
            });
            
        }catch(error){
            console.log(error);
        }
    // };
})

module.exports = app;