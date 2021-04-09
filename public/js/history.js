import { ORDER_HISTORY } from './orderHistory';
import { CART_UPDATE } from './cart';
//TODO sort each cart shop list into one object

export function renderHistory() {
	ORDER_HISTORY.init();
	const data = ORDER_HISTORY.contents;

	CART_UPDATE.updateCounter();

	if (data && data.length > 0) {
		// Create inner parent element
		const historyContainer = document.body.querySelector('.history__container');
		const historyInner = document.createElement('div');
		historyInner.classList.add('history__inner');
		historyContainer.append(historyInner);

		data.forEach(el => {
			const order = document.createElement('div');
			order.classList.add('history__order');
			order.innerHTML = HISTORY_DISPLAY.renderOrder(el);
			historyInner.append(order);
		});

		// Display total
		const total = document.createElement('div');
		total.classList.add('history__total');
		total.innerHTML = HISTORY_DISPLAY.renderTotal(data);
		historyInner.append(total);
	}
}

const HISTORY_DISPLAY = {
	renderOrder(data) {
		return `
            <div class="history__item">
                <h4>Item</h4>
                <p>${data.name}</p>
            </div>
    
            <div class="history__qty">
                <h4>Quantity</h4>
                <p>${data.qty}</p>
            </div>
    
            <div class="history_price">
                <h4>Price</h4>
                <p>$${data.price}</p>
            </div>`;
	},

	renderTotal(data) {
		const saldo = data.reduce((start, item) => {
			return start + item.qty * item.price;
		}, 0);

		return `
            <div class="history__total__saldo">
                <h4 id="history__total__saldo">TOTAL $${saldo}</h4>
            </div>`;
	},
};
