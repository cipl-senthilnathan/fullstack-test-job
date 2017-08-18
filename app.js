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
app.post('/addLocation',routes.addLocationData);
app.get('/getFavorities/loginUserId',routes.getFavoritiesDetails);
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

/*multer config starts
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
     var dir =  './public/uploads/'+req.body.selectedTechnology+'/'+req.body.selectedDomain;
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

app.post('/upload',function(req,res){

  upload(req,res,function(err) {
    console.log("session val :: "+req.session.user.role);
   
    var id=req.body.id;
  //console.log("id in upload::"+req.body.id);
  if(id=="undefined" || id==null || id=='')
  { 
    var tech=req.body.selectedTechnology;
        var domain =req.body.selectedDomain;                  
        var title=req.body.title;
        var description=req.body.description;
        var imgurl = '/' +tech+'/' +domain+'/'+req.files[0].originalname;
        var pdfurl = '/' +tech+'/' +domain+'/'+req.files[1].originalname;
        

        var newcaseStudy=new caseStudy();
        newcaseStudy.technology=tech;
        newcaseStudy.industry=domain;
        newcaseStudy.title=title;
        newcaseStudy.description=description;
        newcaseStudy.imgurl=imgurl;
        newcaseStudy.pdfurl=pdfurl;
                  

        
    if(err) {
      return res.end("Error uploading file.");
      res.redirect("/#/upload");
    }
    newcaseStudy.save(function(err,savedCaseStudy){
             if(err){
             var message="Error occured while storing new CaseStudy !!!";
                console.log(message+"\n"+err);
                res.status(500).send(message);
                }else{
                 res.redirect("/#/dashboard");
                 }
               });
  }
  else
  {
      var tech=req.body.selectedTechnology;
      var domain =req.body.selectedDomain;                  
      var title1=req.body.title;
      var description1=req.body.description;
      var imgurl1 = '/' +tech+'/' +domain+'/'+req.files[0].originalname;
      var pdfurl1 = '/' +tech+'/' +domain+'/'+req.files[1].originalname;

      caseStudy.update({ _id: { $eq: id } },{ $set: { technology: tech,industry: domain,title: title1,description: description1,imgurl: imgurl1,pdfurl: pdfurl1}}).exec(function(err,record){
                                 if(err){
                                   console.log("Error Occured ");
                                   res.status(404).send("Record Not Found");
                                 }
                                 else{
                                       if(!record){
                                         res.status(404).send("No Employee found with ticketId "+ticketId);
                                         }                              
                                          else{
                                                 // res.status(200).send();
                                                  res.redirect("/#/dashboard");
                                              }
                                       }

                                        });

  }

  });

});
multer config end*/







