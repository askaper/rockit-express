var db = require('monk')('localhost/closer');
var Employers = db.get('employers');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/',express.static('.')); 

var mongo = {};
var employers = {}; 

app.get('/api/employer', function(req, res){
  var comesFromWebApp = res.body;
  // return employers.find(comesFromWebApp);
  Employers.find({}, function(err, data){
    res.send(data);
  })
});

app.post('/api/employer',function(req, res){
  var comesFromWebApp = req.body;
  console.log('z-z-z-z-z-z', comesFromWebApp);
  Employers.insert(comesFromWebApp)
  res.sendStatus(200);
})

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
