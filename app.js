var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var product = require('./product');


app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;
var router = express.Router();

mongoose.connect('mongodb://Avadh vashisth:avadh.5868@ds113906.mlab.com:13906/firstnodejs');

router.use(function (req, res, next) {

		router.route('/products').post(function (req, res) {
		    console.log("in add");
		    var p = new product();
		    p.title = req.body.title;
		    p.price = req.body.price;
		    p.instock = req.body.instock;
		    p.photo = req.body.photo;
		    p.save(function (err) {
		        if (err) {
		            res.send(err);
		        }
		        console.log("added");
		        res.send({ message: 'Product Created !' });
		    });
		});

	console.log('Logging of request will be done here');
	next();
});

app.use(cors());
app.use("/api", router);
app.listen(port);
console.log('REST api is running at ' + port);