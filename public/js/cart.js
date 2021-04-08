import { products } from './loadPage';

export const CART = {
	key: 'mycart',
	contents: [],

	init() {
		let _contents = localStorage.getItem(CART.key);
		if (_contents) {
			CART.contents = JSON.parse(_contents);
		} else {
			CART.contents = [];
			CART.syncCart();
		}
	},

	async syncCart() {
		let cart = JSON.stringify(CART.contents);
		await localStorage.setItem(CART.key, cart);
	},

	find(id) {
		return CART.contents.find(item => item._id == id);
	},

	add(id) {
		if (CART.find(id)) {
			CART.increase(id, 1);
		} else {
			//If item isnt in cart > add one
			let item = products.find(item => item._id == id);
			if (item) {
				let obj = {
					...item,
					qty: 1,
				};
				CART.contents.push(obj);
				CART.syncCart();
			}
		}
	},

	increase(id, qty = 1) {
		let item = CART.contents.find(item => item._id == id);
		if (item) {
			item.qty = item.qty + qty;
		}
		CART.syncCart();
	},
	reduce(id, qty = 1) {
		let match = CART.contents.find(item => item._id == id);

		if (match && match.qty == 0) {
			CART.remove(match._id);
		}
		match.qty -= qty;
		CART.sync();
	},
	remove(id) {
		CART.contents = CART.contents.filter(item => item._id != id);
		CART.sync();
	},

	empty() {
		CART.contents = [];
		CART.syncCart();
	},

	logContents() {
		console.log(CART.contents);
	},

	clear() {
		localStorage.clear();
	},
};
