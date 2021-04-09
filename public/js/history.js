import { ORDER_HISTORY } from './orderHistory';
import { CART_UPDATE } from './cart';
//TODO sort each cart shop list into one object

export function renderHistory() {
	CART_UPDATE.updateCounter();
	ORDER_HISTORY.init();

	const data = ORDER_HISTORY.contents;
	console.log(data);

	if (data && data.length > 0) {
		// Create inner parent element
		const historyContainer = document.body.querySelector('.history__container');
		const historyInner = document.createElement('div');
		historyInner.classList.add('history__inner');
		historyContainer.append(historyInner);

		// Each order object
		data.forEach(orderArr => {
			const order = document.createElement('div');
			order.classList.add('history__order');

			orderArr[0].forEach(item => {
				console.log(item);

				//Make div for each item bought in 1 order
				const innerOrderItem = document.createElement('div');
				innerOrderItem.classList.add('history__order__item');
				innerOrderItem.innerHTML = HISTORY_DISPLAY.renderOrder(item);

				order.append(innerOrderItem);
			});
			// Append each order
			historyInner.append(order);

			// Display total
			const total = document.createElement('div');
			total.classList.add('history__total');
			total.innerHTML = HISTORY_DISPLAY.renderTotal(orderArr[1]);
			historyInner.append(total);
		});
		// data.forEach(orderArr => {
		// 	const order = document.createElement('div');
		// 	order.classList.add('history__order');
		// 	// order.innerHTML = HISTORY_DISPLAY.renderOrder(orderArr[0]);
		// 	order.innerHTML = orderArr[0].forEach(item => {
		// 		console.log(item);
		// 		item.innerHTML = HISTORY_DISPLAY.renderOrder(item);
		// 		historyInner.append(order);
		// 	});

		// 	// Display total
		// 	const total = document.createElement('div');
		// 	total.classList.add('history__total');
		// 	total.innerHTML = HISTORY_DISPLAY.renderTotal(orderArr[1]);
		// 	historyInner.append(total);
		// });
	}
}

const HISTORY_DISPLAY = {
	renderOrder(item) {
		return `
			<div class="history__order__item__name">
					<h4>Item</h4>
					<p>${item.name}</p>
			</div>

			<div class="history__order__item__qty">
					<h4>Quantity</h4>
					<p>${item.qty}</p>
			</div>

			<div class="history__order__item__price">
					<h4>Price</h4>
					<p>$${item.price}</p>
			</div>`;
	},

	renderTotal(saldo) {
		return `
            <div class="history__order__total">
                <h4 id="history__order__total">TOTAL $${saldo}</h4>
            </div>`;
	},
};
