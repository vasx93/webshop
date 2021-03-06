import axios from 'axios';
import { CART_UPDATE } from './cart';

export const products = [];

export async function renderHomePage() {
	try {
		CART_UPDATE.updateCounter();

		const res = await axios({
			method: 'GET',
			url: '/api/items',
		});

		if (res.status === 200) {
			const container = document.querySelector('.items__container');

			res.data.items.forEach(el => {
				products.push(el);
				const div = document.createElement('div');
				div.classList.add('item__card');
				div.innerHTML = renderData(el);

				container.append(div);
			});
		}
	} catch (e) {
		console.log(e.message);
	}
}

function renderData(data) {
	return `
    	<div class="item__img">
				<img class="img" src="/img/default.jpeg">
			</div>

    	<div class="item__info">
				<h4>${data.name}</h4>
        <p class="price">$${data.price}</p>
    	</div>

    	<div class="item__order">
				<button class="order" data-id="${data._id}">Add to cart</button>
			</div>
		`;
}
