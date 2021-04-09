import { CART, CART_UPDATE } from './cart';

export function renderCheckoutPage() {
	CART.init();
	const data = CART.contents;
	CART_UPDATE.updateCounter();

	const checkout = document.querySelector('.checkout');
	const userInfo = document.querySelector('.user__info');

	if (data && data.length > 0) {
		// Create wrapper for item cards
		const checkoutInner = document.createElement('div');
		checkoutInner.classList.add('checkout__inner');
		checkout.append(checkoutInner);

		// Render cards for cart items
		data.forEach(item => {
			const card = document.createElement('div');
			card.classList.add('checkout__card');
			card.dataset.id = item._id;
			card.innerHTML = PAGE_DISPLAY.renderCheckoutCard(item);

			checkoutInner.append(card);
		});

		// Render TOTAL
		const total = document.createElement('div');
		total.classList.add('total');
		total.innerHTML = PAGE_DISPLAY.renderTotal(data);
		checkoutInner.append(total);

		// User information
		const userInputs = document.createElement('div');
		userInputs.classList.add('user__info__details');
		userInputs.innerHTML = PAGE_DISPLAY.renderUserInfo();
		userInfo.append(userInputs);
	}
}

const PAGE_DISPLAY = {
	renderCheckoutCard(item) {
		const subtotal = item.price * item.qty;
		return `
    <div class="cart__item">
      <h4>Item</h4>
      <p>${item.name}</p>
    </div>

    <div class="cart__price">
      <h4>Price</h4>
      <p>$${item.price}</p>
    </div>
    
    <div class="cart__qty">
      <h4>Quantity</h4>
      <div class="qty">
        <button class="minus" data-id="${item._id}">
          <i class="fas fa-chevron-left"></i>
        </button>
        <p class="item__p" data-p="${item._id}">${item.qty}</p>
        <button class="plus" data-id="${item._id}">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  
    <div class="cart__subtotal">
      <h4>Subtotal</h4>
      <p class="subtotal" data-sub="${item._id}">$${subtotal}</p>
    </div>
    `;
	},
	renderUserInfo() {
		return `
      
        <h3> Please fill out the shipping details</h3>
        <div class="info">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Your name.." required>
        </div>
  
        <div class="info">
          <label for="phone">Phone number</label>
          <input type="text" id="phone" placeholder="+3816444444..." required>
        </div>
  
        <div class="info">
          <label for="address">Address</label>
          <input type="text" id="address" placeholder="Address..." required>
        </div>
  
        <div class="info">
          <label for="country">Country</label>
          <input type="text" id="country" placeholder="Country..." required>
        </div>
        <div class="info">
          <label for="city">City</label>
          <input type="text" id="city" placeholder="City..."required >
        </div>`;
	},

	renderTotal(data) {
		const saldo = data.reduce((start, item) => {
			return start + item.qty * item.price;
		}, 0);

		return `
    <div class="cart__buttons">
      <div class="cart__update">
        <a href="/"><button id="update">Update Cart</button></a>
      </div>
      <div class="cart__buy">
        <button id="buy">Checkout</button>
      </div>
    </div>
    <div class="cart__total">
      <h4 id="saldo">TOTAL $${saldo}</h4>
    </div>`;
	},
};
