var mongoose = require( 'mongoose' );
var Userlogin = mongoose.model( 'login' );
var Location = mongoose.model( 'location' );
var UserFavorities = mongoose.model( 'userFavourite' );


 exports.loginUser =function(req,res){

                  var user_name=req.body.username;                  
                  var pass_code=req.body.password;  


                    // fetch user and test password verification
              Userlogin.findOne({ username: user_name }, function(err, user) {
            //  if (err) throw err;
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

 /**Get Favorities**/
  exports.getFavoritiesDetails=function(req,res){             
              console.log("req.params.loginUserId:"+req.params.loginUserId);
              
             var loginUserId=req.params.loginUserId; 
              console.log("loginUserId"+loginUserId);
               UserFavorities.find({ userid: loginUserId }, function(err, records) {
             if(err){
                        console.log(err);
                        res.status(500).send("Error Occured while fetching data from technology schema");
                        return;
                      }else{
                        var data=records;                       
                       console.log("datas"+data);
                      //  Location.find({industry: {$in:data}}, function(err, records)
                        res.status(200).send(data);
                      }
              });  
 
          }

exports.getFavoritiesLocationDetails=function(req,res){

        var location= req.params.locationid;
        var userFavoritiesArr = location.split(",").map(function (val) {
              return val;
            });
   Location.find({_id: {$in:userFavoritiesArr}}, function(err, records){
                           
                                      if(err){
                                        console.log(err);
                                        res.status(500).send("Error Occured while fetching data from caseStudy schema");
                                        return;
                                      }else{
                                        var data = records;
                                        console.log(data);
                                        res.status(200).send(data);
                                      }

                              }); 
                            }  

/**Add Favorities**/
exports.addFavoritiesData =function(req,res){

                  var userFavourite =new UserFavorities();
                  
                  userFavourite.locationid=req.body.locationid;;
                  userFavourite.userid=req.body.userid;
                  
                        userFavourite.save(function(err,savedUserFavorities){
                       if(err){
                          var message="Error occured while storing new savedUserFavorities !!!";
                          console.log(message+"\n"+err);
                          res.status(500).send(message);
                        }else{
                          var message="Added Successfully"
                        console.log("Added Successfully");
                         res.status(201).send(message);
                          }
                 });

  }


  /**Delete Favorities**/
  exports.deleteFavoritiesDetails=function(req,res){             
              console.log("req.params.loginUserId:"+req.params.favorite);
              
             var locationid=req.params.favorite; 
             
              console.log("loginUserId"+locationid);
               UserFavorities.remove({ locationid: locationid }, function(err, records) {
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
  exports.getLocationLatAndLong=function(req,res){
          var locationId=req.params.id;
          var userlatitude=req.params.lat;
          var userlongitude=req.params.long;
          var newData;
          console.log("lat && long",userlatitude,userlongitude)
          Location.findOne({"_id":locationId}, function(err, records){                            
          if(err){
            console.log(err);
            res.status(500).send("Error Occured while fetching data location table");
            return;
          }else{
            var data=records;
              var result=getDistance(userlatitude,data.latitude,userlongitude,data.longitude);
                      console.log("Result :::",result);
                      newData={"locationname":data.locationname,
                                    "_id" :data._id,
                                    "imgurl" : data.imgurl,
                                    "longitude" :data.longitude,
                                    "latitude" : data.latitude,
                                    "address" : data.address,
                                    "country" : data.country,
                                    "city" : data.city,
                                    "description" :data.description,
                                    "distance" : result,
                                    "zipcode":data.zipcode,
                                    "province":data.province
                                    }
                      console.log("newData :::",newData);
               res.status(200).send(newData);
            }

          });    

  }
  exports.getLocation=function(req,res){
          var locationId=req.params.id;
          Location.findOne({"_id":locationId}, function(err, records){                            
          if(err){
            console.log(err);
            res.status(500).send("Error Occured while fetching data location table");
            return;
          }else{
            var data=records;  
             res.status(200).send(data);
            }

          });    

  }


  exports.getPlaces=function(req,res){

              Location.find({}, function(err, records){                            
                if(err){
                  console.log(err);
                  res.status(500).send("Error Occured while fetching data location table");
                  return;
                }else{
                  var data=records;
                  console.log("Successfully")
                  res.status(200).send(data);
                }

              });    

  }
  exports.getSortingPlaces=function(req,res){
            var userlatitude=req.params.lat;
            var userlongitude=req.params.long;
            var type=req.params.value;
            var newData=[];
            console.log("userlatitude",userlatitude);
              Location.find({}, function(err, records){                            
                if(err){
                  console.log(err);
                  res.status(500).send("Error Occured while fetching data location table");
                  return;
                }else{
                  var data=records;
                  console.log("Successfully");
                  var i;
                  for(i = 0; i < data.length; i++) {
                      var result=getDistance(userlatitude,data[i].latitude,userlongitude,data[i].longitude);
                      console.log("Result :::",result);
                      newData.push({"locationname":data[i].locationname,
                                    "_id" :data[i]._id,
                                    "imgurl" : data[i].imgurl,
                                    "longitude" : data[i].longitude,
                                    "latitude" : data[i].latitude,
                                    "address" : data[i].address,
                                    "country" : data[i].country,
                                    "city" : data[i].city,
                                    "zipcode":data[i].zipcode,
                                    "province":data[i].province,
                                    "description" :data[i].description,
                                    "distance" : result,
                                    "locationid" : data[i].locationid})
                      console.log("newData :::",newData);
                  }
                  if(type=="min"||type=="Min"){
                    newData=getMin(newData,"distance");
                  }
                  else{
                    newData=getMax(newData,"distance");
                  }
                  res.status(200).send(newData);
                }

              });    

  }

  function getDistance(lati1,lati2,longi1,longi2){
          var lat1 =lati1;
          var lat2 =lati2;

          var lon1 =longi1;
          var lon2 =longi2;

          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2-lat1);  // deg2rad below
          var dLon = deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
           console.log("result"+d);
           return d;

  };
  function deg2rad(deg) {
          return deg * (Math.PI/180)
  }

  function getMax(arr, prop) {
    return arr.sort(function(a,b) { 
    return a[prop] < b[prop];
  });
  } 
  function getMin(arr, prop) {
    return arr.sort(function(a,b) { 
    return a[prop] > b[prop];
  });
  } 