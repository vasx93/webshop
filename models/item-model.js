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

		inStock: {
			type: Boolean,
			default: true,
		},

		image: String,
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Delete some info from going to clientside
itemSchema.toJSON = function () {
	const item = this.toObject();

	delete item.createdAt;
	delete item.updatedAt;
	delete item.__v;
	delete item.id;

	return item;
};
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
