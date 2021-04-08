import '@babel/polyfill';
import { loadPage } from './loadPage';
import { CART, incrementCart, decreaseCart } from './cart';
import { renderCheckoutPage } from './checkout';

//TODO set up a counter

//* HOME PAGE
if (document.querySelector('.items__container')) {
	window.onload = loadPage();
	CART.init();

	document.body.addEventListener('click', ev => {
		if (ev.target.classList.contains('order')) {
			const id = ev.target.dataset.id;
			CART.add(id);
		}
	});
}

//* CHECKOUT PAGE
if (document.querySelector('.checkout')) {
	renderCheckoutPage();

	// Buttons
	const plus = document.body.querySelector('.plus');
	const minus = document.body.querySelector('.minus');

	plus.addEventListener('click', ev => {
		const id = ev.target.dataset.id;
		CART.increase(id, 1);

		// const parent = ev.target.parentElement;

		// let qty = parent.getElementsByTagName('p');

		// let item = CART.find(id);

		// if (item) {
		// 	qty.textContent = item.qty;
		// } else {
		// }
	});

	minus.addEventListener('click', ev => {
		const id = ev.target.dataset.id;
	});
}
