var mongoose = require( 'mongoose' );
var Userlogin = mongoose.model( 'login' );
var Location = mongoose.model( 'location' );

 exports.loginUser =function(req,res){

                  var user_name=req.body.username;                  
                  var pass_code=req.body.password;  


                    // fetch user and test password verification
              Userlogin.findOne({ username: user_name }, function(err, user) {
              if (err) throw err;
                 var data=user;
                  if(data!=null){
                   if(user_name == data.username & pass_code == data.password){
                    req.session.user = user;
                    message="Login Successful";
                    console.log(message);
                    res.status(201).send(req.session.user);    
                    return;
                      }
                  }  
                  else{
                   
                    message="ERROR : Bad Request, Invalid value ";
                    console.log(message);
                    res.status(400).send(message); 
                    // alert("Invalid username or password");

                  } 
              });            

              }

   exports.addLocationData =function(req,res){

                  var user_name=req.body.locationname;                  
                  var pass_code=req.body.description;
                  var pass_code=req.body.photos;
                  var pass_code=req.body.zipCode;
                  var pass_code=req.body.province;
                  var pass_code=req.body.country;
                  var pass_code=req.body.city;
                  var pass_code=req.body.address;


                    // fetch user and test password verification
              Location.findOne({ username: user_name }, function(err, user) {
              if (err) throw err;
                 var data=user;
                  if(data!=null){
                   if(user_name == data.username & pass_code == data.password){
                    req.session.user = user;
                    message="Login Successful";
                    console.log(message);
                    res.status(201).send(req.session.user);    
                    return;
                      }
                  }  
                  else{
                   
                    message="ERROR : Bad Request, Invalid value ";
                    console.log(message);
                    res.status(400).send(message); 
                    // alert("Invalid username or password");

                  } 
              });            

              }
       
	/*exports.getTechnology=function(req,res){

                              TechnologyData.find({}, function(err, records){
                            
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occured while fetching data from technology schema");
                                        return;
                                      }else{
                                        var data=records;
                                        res.status(200).send(data);
                                      }

                              }); 

                            }

exports.getDoamin=function(req,res){

                              IndustryData.find({}, function(err, records){
                            
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occured while fetching data from technology schema");
                                        return;
                                      }else{
                                        var data=records;
                                        res.status(200).send(data);
                                      }

                              }); 

                            }



exports.getDashboard=function(req,res){
  
                  caseStudy.find({},function(err, records){                            
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occured while fetching data from caseStudy schema");
                                        return;
                                      }else{
                                        var data = records;
                                      //  console.log("data check :: "+data);
                                        res.status(200).send(data);
                                      }

                              });
                             
                            }

  exports.getDashboardParamDomainId=function(req,res){

  var domain= req.params.domainId;
  var domainArr = domain.split(",").map(function (val) {
        return val;
      });
   caseStudy.find({industry: {$in:domainArr}}, function(err, records){
                           
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occured while fetching data from caseStudy schema");
                                        return;
                                      }else{
                                        var data = records;
                                        //console.log("inside getDashboardParamDomainId data "+data); 
                                        res.status(200).send(data);
                                      }

                              }); 
                            }   

  exports.getDashboardParamTechId=function(req,res){
   var tech =req.params.techId;
   var techArr = tech.split(",").map(function (val) {
        return val;
      });
   caseStudy.find({technology: {$in:techArr}}, function(err, records){                            
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occured while fetching data from caseStudy schema");
                                        return;
                                      }else{
                                        var data = records;
                                       //  console.log("inside getDashboardParamTechId data"+data);
                                        res.status(200).send(data);
                                      }

                              }); 
                            } 

  exports.getDashboardParamTechAndDomain=function(req,res){
  var domain =req.params.domainId;
   var domainArr = domain.split(",").map(function (val) {
        return val;
      });
   var tech =req.params.techId;
   var techArr = tech.split(",").map(function (val) {
        return val;
      });
 
   
  caseStudy.find({$and:[{technology: {$in:techArr}},{industry: {$in:domainArr}}]}, function(err, records){
                                      if(err){
                                        res.status(500).send("Error Occured while fetching data from caseStudy schema");
                                        return;
                                      }else{
                                        var data = records;
                                        res.status(200).send(data);
                                      }

                              }); 
                            }*/

/*
exports.getDashboardParamDomainId=function(req,res){
   var domain =req.params.domainId;
   
                              caseStudy.find({industry: domain}, function(err, records){                            
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occured while fetching data from caseStudy schema");
                                        return;
                                      }else{
                                        var data = records;
                                        console.log("data check :: "+data);
                                        res.status(200).send(data);
                                      }

                              }); 
                            }



exports.getDashboardParamTechAndDomain=function(req,res){
  var domain =req.params.domainId;
  // console.log("domain : "+domain);
   var tech =req.params.techId;
  // console.log("tech : "+tech);
   
  //caseStudy.find({$and:[{technology: {$in:["Java","Android"]}},{industry: {$in:["Banking","Health Care"]}}]}, function(err, records){
                              caseStudy.find({$and:[{industry: domain},{technology: tech}]}, function(err, records){                            
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occured while fetching data from caseStudy schema");
                                        return;
                                      }else{
                                        var data = records;
                                        res.status(200).send(data);
                                      }

                              }); 
                            }

                         
exports.getDashboardParamTechAndDomainTest=function(req,res){
  var domain =req.params.domainId;
  var tech =req.params.techId;

                              caseStudy.find({$and:[{technology: tech},{industry: domain}]}, function(err, records){                            
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occured while fetching data from caseStudy schema");
                                        return;
                                      }else{
                                        var data = records;
                                        res.status(200).send(data);
                                      }

                              }); 
                            }
                         */

/*exports.getUpload=function(req,res){
                  var tech=req.body.selectedTechnology;
                  var domain =req.body.selectedDomain;                  
                  var tittle=req.body.title;
                  var description=req.body.description;
                  var image = req.body.myImageFile;
                  

                  console.log( '/' +tech+'/' +domain+'/'+image );
                  var pdf = req.body.myPdfFile;


                  console.log( '/' +tech+'/' +domain+'/'+pdf );

                  var newcaseStudy=new caseStudy();
                  newcaseStudy.technology=tech;
                  newcaseStudy.industry=domain;
                  newcaseStudy.title=tittle;
                  newcaseStudy.description=description;
                  /*newcaseStudy.imgurl=image;
                  newcaseStudy.pdfurl=pdf;*/
                  

                /*  newcaseStudy.save(function(err,savedCaseStudy){
                       if(err){
                          var message="Error occured while storing new CaseStudy !!!";
                          console.log(message+"\n"+err);
                          res.status(500).send(message);
                        }else{
                         res.status(201).send(savedCaseStudy);
                          }
                 });

                 }*/


   /* exports.getDeleteimg=function(req,res){
      var id =req.params.id1;
      console.log("id="+id);

                              caseStudy.remove({_id: id}, function(err, records){                            
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error in removing document");
                                        return;
                                      }else{
                                        var message="Deleted Successfully"
                                        console.log("Deleted Successfully");
                                        res.status(201).send(message); 
                                      }

                              }); 

        
}
    exports.getUpdateDetails=function(req,res){
      var id =req.params.id1;
      //console.log("id="+id);

                              caseStudy.findOne({_id: id}, function(err, records){                            
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error in removing document");
                                        return;
                                      }else{
                                        var message="Fetched Data";
                                        //console.log(message);
                                        var data = records;
                                        res.status(200).send(data);
                                      }

                              }); 

        
}*/

			  
			  

