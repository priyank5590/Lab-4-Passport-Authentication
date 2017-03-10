//create a game model with mongoose to do CRUD operations
let mongoose = require('mongoose');

let gameSchema = new mongoose.Schema({
	title:{
		type: String,
		required: 'Title is Required'
		},
	category:{
		type: String,
		required: 'Category is Required'
		},
	developer:{
		type: String,
		required: 'publisher is Required'
		},
	genre:{
		type: String
		},
	year:{
		type: Number,
		required: 'year is Required',
		min: 1970
		}
});

module.exports = mongoose.model('Game', gameSchema);