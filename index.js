var express = require('express');
var app=express();
const mongoose = require('mongoose');
var path = require('path');

const port = process.env.PORT || 3000;
const database_url = 'mongodb://127.0.0.1:27017/flight';
const coll_name='all_flights';

mongoose.connect(database_url, { useUnifiedTopology: true, useNewUrlParser: true }).then(
  () => {console.log('successfully database connected'); },
  err => {console.log('error occured'); console.log(err); }
);
const fschema = new mongoose.Schema({
	fid : String,
	origin : String,
	destination: String,
	dep_time : String
});
const fmodel = mongoose.model(coll_name, fschema);

app.use(express.static(__dirname));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));  //for parsing urlencoded json body

//get request to search flight by id
app.get('/:id',

	function(req,res){
		// try to find the flight with the id
		try{
			fmodel.findOne({'fid':req.params['id']}).then((resp)=>{
				if(resp!=null){
					// console.log(resp);
					res.json(resp);
				}
				else{
					res.sendStatus(404);
				}
			});
		}
		catch(err){
			//internal server error (unexpected)
			res.sendStatus(500);
		}
	}
);

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname, 'src.html'));
});

var lat=1,long=0;

//get request to track by flight id
app.get('/tracking/:id',
	function(req,res){
		// console.log("got req");
		res.json({
			'lat': lat,
			'long':long
		});
	}
);

function update_lat_long(){
	if(lat<1000)lat+=1; else lat=1;
	if(long<2000) long+=2; else long=0;
}

app.listen(port,() => {
	console.log('flight RESTful API server started on: ' + port);
	setInterval(update_lat_long,1000);
});