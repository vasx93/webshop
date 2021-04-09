import { products } from './homepage';

export const CART = {
	key: 'mycart',
	contents: [],

	init() {
		let _contents = localStorage.getItem(this.key);
		if (_contents) {
			this.contents = JSON.parse(_contents);
		} else {
			this.contents = [];
			this.syncCart();
		}
	},

	async syncCart() {
		let cart = JSON.stringify(this.contents);
		await localStorage.setItem(this.key, cart);
	},

	find(id) {
		return this.contents.find(item => item._id == id);
	},

	add(id) {
		if (this.find(id)) {
			this.increase(id, 1);
		} else {
			//If item isnt in cart > add one
			let item = products.find(item => item._id == id);
			if (item) {
				let obj = {
					...item,
					qty: 1,
				};
				this.contents.push(obj);
				this.syncCart();
			}
		}
	},

	increase(id, qty = 1) {
		let item = this.contents.find(item => item._id == id);
		if (item) {
			item.qty = item.qty + qty;
		}
		this.syncCart();
	},

	reduce(id, qty = 1) {
		let match = this.contents.find(item => item._id == id);

		if (match && match.qty == 0) {
			this.remove(match._id);
		}
		match.qty -= qty;
		this.syncCart();
	},
	remove(id) {
		this.contents = this.contents.filter(item => item._id != id);
		this.syncCart();
	},

	empty() {
		this.contents = [];
		this.syncCart();
	},

	clear() {
		localStorage.removeItem(this.key);
	},
};

export const CART_UPDATE = {
	updateQty(id) {
		const itemQty = document.body.querySelector(`[data-p="${id}"]`);
		const item = CART.find(id);

		if (item.qty >= 1) {
			itemQty.textContent = item.qty;
		} else {
			CART.remove(id);
			const parent = document.body.querySelector('.checkout__inner');
			const card = document.body.querySelector(`[data-id="${id}"]`);

			parent.removeChild(card);
			this.updateTotal();
			CART_UPDATE.updateCounter();
		}
	},

	updateSubtotal(id) {
		const sub = document.body.querySelector(`[data-sub="${id}"]`);
		const item = CART.find(id);

		sub.textContent = `$${item.price * item.qty}`;
		this.updateTotal();
	},
	updateTotal() {
		const subs = Array.from(document.body.querySelectorAll('.subtotal'));

		let total = 0;

		subs.forEach(el => {
			total += el.textContent.split('$')[1] * 1;
		});
		document.body.querySelector('#saldo').textContent = `TOTAL $${total}`;
	},

	updateCounter() {
		CART.init();
		let counter = document.body.querySelector('.counter');
		const value = CART.contents.reduce((acc, next) => {
			return acc + next.qty;
		}, 0);
		counter.textContent = value;
	},
};
