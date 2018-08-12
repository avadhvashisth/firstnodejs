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


mongoose.connect('mongodb://first:avadh123@ds113906.mlab.com:13906/firstnodejs',function(err,e){
    if(err) return console.log(err);
    console.log('connected!!!');
});

//fetching records (retrieve)

router.route('/products').get(function (req,res) {
	product.find(function (err, products) {
		if(err){
			res.send(err);
		}
		res.send(products);
	});
});

router.route('/products/:product_id').get(function (req, res) {
	
	product.findById(req.params.product_id, function(err, prod){
		if(err){
			res.send(err);
		}
		res.json(prod);
	});
});

//creating records
		
router.route('/products').post(function (req, res) {
	console.log("in add");
	var p = new product({
		title:req.body.title,
		price:req.body.price,
		instock:req.body.instock,
		photo:req.body.photo
    });

    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        console.log("added");
        res.send({ message: 'Product Created !' });
    });
});


//updating records

router.route('/products/:product_id').put(function (req,res) {
	
	product.findById(req.params.product_id, function (err, prod) {
		if (err){
			res.send(err);
		}
		prod.title = req.body.title;
		prod.price = req.body.price;
		prod.instock = req.body.instock;
		prod.photo = req.body.photo;
		prod.save(function (err) {
			if(err)
				res.send(err);

			res.json({ message: 'product updated!' });
		});

	});
});


//Delete records

router.route('/products/:product_id').delete(function (req, res) {
	
	product.remove({ _id: req.params.product_id }, function (err, prod) {
		if(err){
			res.send(err);
		}

		res.json({message: 'successfully deleated'});
	});
});
app.use(cors());
app.use("/api", router);
app.listen(port);
console.log('REST api is running at ' + port);