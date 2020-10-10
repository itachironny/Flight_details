var app = require('express')();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const database_url = 'mongodb://127.0.0.1:27017/flight';
const coll_name='all_flights';

mongoose.connect(database_url, { useUnifiedTopology: true, useNewUrlParser: true }).then(
  () => {console.log('successfully database connected'); },
  err => {console.log('error occured'); console.log(err); }
);
const fschema = new mongoose.Schema({
	fnum : Number,
	origin : String,
	destination: String,
	dep_time : String
});
const fmodel = mongoose.model(coll_name, fschema);

//get request to search flight by id
app.get('/:Id',function(req,res){

	var q = parseInt(req.params['Id']); //get the id and convert to integer
	if(isNaN(q)){res.send("Not a valid id");res.end();} //check if the id has been successfully converted
	
	// try to find the flight with the id
	try{
		fmodel.findOne({'fnum':q}).then((resp)=>{
			if(resp!=null){
				res.json(resp);
			}
			else{
				res.send("No such flight number exists"); res.end();
			}
		});
	}
	catch(err){
		// console.log(err);
		res.sendStatus(404); res.end();
	}
	
});

app.get('/',function(req,res){
	res.send("Just a page");
});


app.listen(port,() => console.log('flight RESTful API server started on: ' + port));