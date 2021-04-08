const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			minlength: 1,
			maxlength: 99,
			default: 'Patike Z',
		},

		price: {
			type: Number,
			default: function (value) {
				// Random price 1 ~ 100
				return (value = Math.floor(Math.random() * 100) + 1);
			},
		},
		image: String,
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
