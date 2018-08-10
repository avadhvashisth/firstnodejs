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

router.get('/',function(req,res){
	return res.json({'js':"ajsna"});
})
		
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

app.use(cors());
app.use("/api", router);
app.listen(port);
console.log('REST api is running at ' + port);