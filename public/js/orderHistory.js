export const ORDER_HISTORY = {
	key: 'orderHistory',
	contents: [],

	init() {
		let _contents = localStorage.getItem(this.key);
		if (_contents) {
			this.contents = JSON.parse(_contents);
		} else {
			this.contents = [];
			this.syncHistory();
		}
	},

	async syncHistory() {
		let cart = JSON.stringify(this.contents);
		await localStorage.setItem(this.key, cart);
	},

	empty() {
		this.contents = [];
		this.syncHistory();
	},

	clear() {
		localStorage.removeItem(this.key);
	},
};
