import '@babel/polyfill';
import { renderHomePage } from './homepage';
import { renderCheckoutPage } from './checkout';
import { renderHistory } from './history';
import { CART, CART_UPDATE } from './cart';
import { ORDER_HISTORY } from './orderHistory';

//TODO set up a counter

//* HOME PAGE
if (document.querySelector('.items__container')) {
	renderHomePage();

	document.body.addEventListener('click', ev => {
		if (ev.target.classList.contains('order')) {
			CART.init();
			const id = ev.target.dataset.id;
			CART.add(id);
			CART_UPDATE.updateCounter();
		}
	});
}

//* ORDER HISTORY PAGE

if (document.body.querySelector('.history__container')) {
	renderHistory();
}

//* CHECKOUT PAGE
if (document.querySelector('.checkout')) {
	renderCheckoutPage();

	// Increment cart item
	if (document.body.querySelectorAll('.plus')) {
		const plusBtns = Array.from(document.body.querySelectorAll('.plus'));

		plusBtns.forEach(el => {
			el.addEventListener('click', ev => {
				const id = ev.target.dataset.id;
				CART.increase(id, 1);

				CART_UPDATE.updateQty(id);
				CART_UPDATE.updateSubtotal(id);
				CART_UPDATE.updateTotal();
				CART_UPDATE.updateCounter();
			});
		});
	}

	// Decrement cart item
	if (document.body.querySelectorAll('.minus')) {
		const minusBtns = Array.from(document.body.querySelectorAll('.minus'));

		minusBtns.forEach(el => {
			el.addEventListener('click', ev => {
				const id = ev.target.dataset.id;
				CART.reduce(id, 1);

				CART_UPDATE.updateQty(id);
				CART_UPDATE.updateSubtotal(id);
				CART_UPDATE.updateTotal();
				CART_UPDATE.updateCounter();
			});
		});
	}

	// Checkout btn
	if (document.body.querySelector('#buy')) {
		document.body.querySelector('#buy').addEventListener('click', ev => {
			// Init history in localStorage
			ORDER_HISTORY.init();
			CART.init();

			// Push cart items into localStorage history
			CART.contents.forEach(el => ORDER_HISTORY.contents.push(el));
			ORDER_HISTORY.syncHistory();

			// Delete cart
			CART.empty();
			CART_UPDATE.updateCounter();

			// Complete order
			window.setTimeout(() => {
				alert('Order completed');
				location.assign('/order-history');
			}, 500);
		});
	}
}
