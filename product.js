var mongoos = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
	title: String,
	Price: Number,
	instock: Boolean,
	photo: String,
});