var app = require('express')();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const database_url = 'mongodb://127.0.0.1:27017/flight';
const coll_name='all_names';

mongoose.connect(database_url, { useUnifiedTopology: true, useUnifiedTopology: true }).then(
  () => {console.log('successfully database connected'); },
  err => {console.log('error occured'); console.log(err); }
);
const fschema = new mongoose.Schema({
	name : String,
	title : String,
	biggest_fear: String
});
const fmodel = mongoose.model(coll_name, fschema);
fmodel.find().then((resp)=>{
	console.log(resp);
});

app.get('/',function(req,res){
	fmodel.find().then((resp)=>{
		res.json(resp);
	});
});


app.listen(port,() => console.log('todo list RESTful API server started on: ' + port));