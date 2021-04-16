const sharp = require("sharp")
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
var http = require('http'); 

// const imageModel = require('../models/imageModel');
const images = require("../models/imageModel");

const processImages = async () => {
    path1 = path.join(__dirname , '../img')
    path2 = path.join(__dirname , '../compress_images')
    var urls = [];
    fs.readdir(path1, (err, files) =>{
        if(err){
            return console.log("Unable to scan directory" + err);
        }
        else{
            console.log("Asdf")
            files.forEach(file =>{
                urls.push(file);
            })
            // res.status(200).jsonp({
            //     status: 'sucess'
            // });
        }
    });
    console.log(urls[0])
    await urls.forEach(url =>{
        console.log(url)
        http.post('/', async (req, res) => {

                try {
                    image_path = path.join(path1, url);
                    comrpess_path = path.join(path2, url)
                    var info = await sharp(image_path).resize(65, 65, {
                        fit : "contain"
                    }).jpeg().toFile(comrpess_path);
        
                    var obj = {
                        name : "aa",
                        image : {
                            data: comrpess_path,
                            contentType : '../image/jpeg'
                        }
                    }
                    images.create(obj, (err, item) => {
                        if(err) throw err;
                        console.log(info);   
                    })
                    // images.save((err, img) =>{
                    //     if(err) throw err;
                    //     console.error('saved img to database');
                    // }); 
                    
                }catch(error){
                    console.log(error);
                }
    
        })
    } )
};

processImages();

module.exports = app;