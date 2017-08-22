'use strict';

var express=require('express');
var bodyParser=require('body-parser');

var app=express();
//multer import
var multer  = require('multer');
var db=require('./models/db.js');
var routes=require('./routes/route.js');

var mongoose = require( 'mongoose' );
// var caseStudy = mongoose.model( 'casestudy' );
var fs = require('fs');
var mkdirp = require('mkdirp');
var LocationData = mongoose.model( 'location' );
var ObjectID = require('mongodb').ObjectID;
//google map api
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  // Optional depending on the providers 
  httpAdapter: 'https', // Default 
  apiKey: 'AIzaSyDnDLynM7gHse31qPQuvkS9ihzi2tIR9bo', // for Mapquest, OpenCage, Google Premier 
  formatter: 'json'         // 'gpx', 'string', ... 
};
//end google map api
var geocoder = NodeGeocoder(options);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var session = require('client-sessions');
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  expires : new Date(Date.now() + 300000)
}));

app.get('/', function(req,res) {
  res.sendFile('public/index.html');
});


app.post('/login',routes.loginUser);
app.get('/places',routes.getPlaces);
app.get('/places/:lat/:long/:value',routes.getSortingPlaces);
app.get('/location/:id',routes.getLocation);
app.get('/getFavorities/:loginUserId',routes.getFavoritiesDetails);
app.get('/getFavoritiesLocation/:locationid',routes.getFavoritiesLocationDetails);
app.delete('/deletefavorite/:favorite',routes.deleteFavoritiesDetails);
app.post('/addFavorities',routes.addFavoritiesData);
// app.get('/technology',routes.getTechnology);
// app.get('/domain',routes.getDoamin);
// app.get('/dashboard',routes.getDashboard);
// app.get('/getDashboardParamDomainId/:domainId',routes.getDashboardParamDomainId);
// app.get('/getDashboardParamTechId/:techId',routes.getDashboardParamTechId);
// app.get('/getDashboardParamTechAndDomain/:domainId/:techId',routes.getDashboardParamTechAndDomain);
// app.get('/deleteimg/:id1',routes.getDeleteimg);
// app.get('/upload/:id1',routes.getUpdateDetails);
//app.get('/getDashboardParamTechAndDomainTest/:techId/:domainId',routes.getDashboardParamTechAndDomain);
//app.post('/upload',routes.getUpload);



var port = process.env.PORT || 3000;

var server=app.listen(port,function(req,res){
    console.log("Catch the action at http://localhost:"+port);
});

// multer config starts
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      console.log("File Name",file.originalname);
     var dir =  './public/uploads/'+req.body.locationname;
     if (!fs.exists(dir))
     {
      mkdirp(dir, function (err) {
       if (err) console.error(err)
       else 
         callback(null, dir);
      });
     }
    else
     {
      console.log("Directory Already Exists");
      callback(null, dir);
     }
  },  
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage }).array('userPhoto',2);

app.post('/location',function(req,res){

  upload(req,res,function(err) {
   console.log("id in upload::",req.body.locationname);
   console.log("id in file::",req.files);
  var id=req.body.id;
  //console.log("id in upload::"+req.body.id);
  if(id=="undefined" || id==null || id=='')
  { 
    var locName=req.body.locationname;
    var description=req.body.description;
    var address=req.body.address;
    var city=req.body.city;
    var country=req.body.country;
    var zipCode=req.body.zipCode;
    var province=req.body.province;
    var latitude;
    var values=address+''+city+''+country+''+zipCode;

    geocodeLoc(values, function(error, result){
    console.log('here is your result',result);
     
    var newlocation=new LocationData();
    newlocation.locationname=locName;
    newlocation.description=description;
    newlocation.zipcode=zipCode;
    newlocation.city=city;
    newlocation.province=province;
    newlocation.country=country;
    newlocation.address=address;
    newlocation.latitude=result.lat;
    newlocation.longitude=result.lng;
    newlocation.imgurl='/' +locName+'/'+req.files[0].originalname;
    if(err) {
      return res.end("Error uploading file.");
      res.redirect("/#/upload");
    }
    newlocation.save(function(err,savedlocation){
      if(err){
        var message="Error in adding new location !!!";
        console.log(message+"\n"+err);
        res.status(500).send(message);
      }else{
        res.status(200).send("location added successfully");
        }
    });
    });  
  }
  else{
    console.log("location id:",id);
     var newlocation=new LocationData();
    var description=req.body.description;
    var address=req.body.address;
    var city=req.body.city;
    var country=req.body.country;
    var zipCode=req.body.zipCode;
    var province=req.body.province;
    var address=req.body.address;
    var values=address+''+city+''+country+''+zipCode;
     var oid=new ObjectID(id);
    geocodeLoc(values, function(error, result){
    console.log('here is your result',result);
     
    var oid=new ObjectID(id);
    var imgurl='/' +locName+'/'+req.files[0].originalname;
    if(err) {
      return res.end("Error uploading file.");
      res.redirect("/#/addlocation/");
    }
    console.log("*****Before Update****",id);
    newlocation.update({ _id:  oid },{ $set: { description: description,province:province,address: address,city: city,country: country,imgurl: imgurl,zipcode: zipCode,latitude:result.lat,longitude:result.lng}}).exec(function(err,record){
                                if(err){
                                   console.log("Error Occured ");
                                   res.status(404).send("Record Not Found");
                                 }
                                 else{
                                       if(!record){
                                         res.status(404).send("No Employee found with ticketId ");
                                         }                              
                                          else{
                                                 // res.status(200).send();
                                                  res.redirect("/#/dashboard");
                                              }
                                       }
                                  

    });
    });  

  }  

  });

});

var request = require('request');
var geocodeLoc = function(location, callback)
    {
        var result;
        var baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location;
        request(baseURL, function(e, r, b){
        if(!e && r.statusCode == 200){
            result = (JSON.parse(b).results[0].geometry.location);
            console.log(result);
            callback(null, result);
        }else{
            callback(e);
        }
    });
}
