var chalk = require('chalk');
var mongoose = require( 'mongoose' ),
 Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;
 // var autoIncrement = require('mongodb-autoincrement');

var dbURI = 'mongodb://localhost/fullstack-test-job';

//autoIncrement.initialize(dbURI);
// var dbURI =  'mongodb://mongodbadmin:mongodbadmin@ds023465.mlab.com:23465/cipl-case-study-db';


mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log(chalk.green('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});

var userloginSchema = new mongoose.Schema({
  username: {type: String, required: true, index: { unique: true }},
  password: {type: String}
}); 

mongoose.model( 'login', userloginSchema );

var locationSchema = new mongoose.Schema({
    locationname:{type: String, required: true, index: { unique: true }},
    latitude:{ type: String },
    longitude: { type: String },    
    description: { type: String },
    imgurl: { type: String },
    province: { type: String },
    zipcode: { type: String },
    country: { type: String },
    city: { type: String },
    address: { type: String },
    isfavorite:{type:Boolean}

    
});
mongoose.model( 'location', locationSchema );

var userFavourite = new mongoose.Schema({
 
  userid:{ type: String },
  locationid: { type: String },
  createdAt:{type:Date}

},{_id: true}); 

// userFavourite.plugin(autoIncrement.mongoosePlugin);
mongoose.model( 'userFavourite', userFavourite );



