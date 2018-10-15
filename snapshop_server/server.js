let express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');
    path=require('path');

// mongoose instance connection url connection
mongoose.connect('mongodb://localhost:27017/snapshopDB', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
console.log(mongoose.Promise);
//Adding body parser for handling request and response objects.

app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(bodyParser.urlencoded({
// extended: true
// }));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

// app.get('/*',(req,res) =>{
// res.sendFile(path.join(__dirname,'/public/index.html'))
// })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Accept-Language");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//Initialize app
let initApp = require('./api/app');
initApp(app);

app.listen(port);
console.log('SnapShop RESTful API server started on: ' + port);