const CART = {
	key: 'asdasdsadsadasdsadasd',
	contents: [],

	logContents() {
		console.log(CART.contents);
	},

	init() {
		let _contents = localStorage.getItem(CART.key);
		if (_contents) {
			CART.contents = JSON.parse(_contents);
		}
	},

	empty() {
		// Empty the cart
		CART.contents = [];
		// Update
		CART.syncCart();
	},

	async syncCart() {
		let cart = JSON.stringify(CART.contents);
		await localStorage.setItem(CART.key, cart);
	},

	find(id) {
		let match = CART.contents.filter(item => {
			if (item.id == id) true;
		});

		if (match && match[0]) match[0];
	},

	add(id) {
		//add a new item to the cart
		//check that it is not in the cart already
		if (CART.find(id)) {
			CART.increase(id, 1);
		} else {
			let arr = PRODUCTS.filter(product => {
				if (product.id == id) {
					return true;
				}
			});
			if (arr && arr[0]) {
				let obj = {
					id: arr[0].id,
					title: arr[0].title,
					qty: 1,
					itemPrice: arr[0].price,
				};
				CART.contents.push(obj);
				//update localStorage
				CART.sync();
			} else {
				//product id does not exist in products data
				console.error('Invalid Product');
			}
		}
	},
};

function addItem(ev) {
	ev.preventDefault();

	let id = ev.target.getAttribute('item-id');
	CART.add(id, 1);
	showCart();
}

// const btns = Array.from(document.querySelectorAll('.order'));

// document.querySelectorAll('.order').forEach(el => {
// 	el.addEventListener('click', ev => {
// 		const itemId = ev.target.dataset.itemId;
// 		console.log(itemId);

// 		addToCart(itemId);
// 	});
// });

// function addToCart(itemId, itemPrice) {
// 	// get the current cart, or an empty object if null
// 	let cart = JSON.parse(localStorage.getItem('Sneakers')) || {};

// 	// Update cart
// 	if (cart[itemId]) {
// 		cart[itemId].count++;
// 	} else {
// 		cart[itemId] = {
// 			itemPrice,
// 			count: 1,
// 		};
// 	}

// 	localStorage.setItem('Sneakers', JSON.stringify(cart));
// }

//*   ~~~   PAGE ON LOAD   ~~~
async function loadPage() {
	try {
		const res = await axios({
			method: 'GET',
			url: '/api/items',
		});

		if (res.status === 200) {
			console.log(res.data.items);

			const container = document.querySelector('.items__container');

			for (patika of res.data.items) {
				const div = document.createElement('div');
				div.classList.add('item__card');
				div.innerHTML = renderData(patika);

				container.append(div);
			}
		}
	} catch (e) {
		console.log(e.message);
		const main = document.querySelectorAll('.main');
		main.innerHTML = `
			<div class="error">
				<div class="error__title">
					<h2>Something went wrong</h2>
					<h2 class="error__emoji">😢 🤯</h2>
				</div>
			<div class="error__msg">${e.message}</div>
		</div>	
		`;
	}
}

// Redner each item card
function renderData(data) {
	const inStock = data.inStock === true ? 'Yes' : 'Sold out';
	return `
    	<div class="item__img">
				<img class="img" src="/img/default.jpeg">
			</div>

    	<div class="item__name">
        <p>${data.name}</p>
    	</div>

    	<div class="item__info">
        <p class="price">$${data.price}</p>
        <p>In Stock: ${inStock}</p>
    	</div>

    	<div class="item__order">
				<button class="order" value="${data._id}">Add to cart now!</button>
			</div>
		`;
}

window.onload = loadPage();
