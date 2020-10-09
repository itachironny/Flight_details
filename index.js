var app = require('express')();
const port = process.env.PORT || 3000;

app.get('/',function(req,res){
	res.json({
		'name' : 'ron',
		'title' : 'weasley',
		'biggest fear': 'spiders'
	});
});


app.listen(port,() => console.log('todo list RESTful API server started on: ' + port));