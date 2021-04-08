import { CART } from './cart';

export function renderCheckoutPage() {
	CART.init();
	const data = CART.contents;

	const checkout = document.querySelector('.checkout');
	const userInfo = document.querySelector('.user__info');

	if (data && data.length > 0) {
		// Create each item card -- checkout
		const d = document.createElement('div');
		d.classList.add('checkout__inner');
		checkout.append(d);

		data.forEach(item => {
			const div = document.createElement('div');
			div.classList.add('checkout__card');
			div.innerHTML = renderCheckoutCard(item);

			d.append(div);
		});

		// TOTAL
		const saldo = data.reduce((start, item) => {
			return start + item.qty * item.price;
		}, 0);

		const total = document.createElement('div');
		total.classList.add('total');
		total.innerHTML = `
  <div class="cart__buttons">
    <div class="cart__update">
      <a id="update" href="/"><button>Update Cart</button></a>
    </div>
    <div class="cart__buy">
      <a id="buy" href="/"><button>Checkout</button></a>
    </div>
  </div>
  <div class="cart__total">
    <h4>TOTAL $${saldo}</h4>
  </div>

  `;
		d.append(total);

		// User information
		const i = document.createElement('div');
		i.classList.add('user__info__details');
		i.innerHTML = renderUserInfo();
		userInfo.append(i);
	}
}

// 	/* <div class="cart__img">
//     <img src="/img/default.jpeg" alt="SneakerZ">
//   </div> */

function renderCheckoutCard(item) {
	const subtotal = item.price * item.qty;
	return `
  <div class="cart__item">
    <h4>Item</h4>
    <p>${item.name}</p>
  </div>
  
  <div class="cart__qty">
    <h4>Quantity</h4>
    <div class="qty">
      <button class="minus" data-id="${item._id}">
        <i class="fas fa-chevron-left"></i>
      </button>
      <p>${item.qty}</p>
      <button class="plus" data-id="${item._id}">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>

  <div class="cart__subtotal">
    <h4>Subtotal</h4>
    <p>$${subtotal}</p>
  </div>
  `;
}

function renderUserInfo() {
	return `
    
      <h3> Please fill out the shipping details</h3>
      <div class="info">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Your name..">
      </div>

      <div class="info">
        <label for="phone">Phone number</label>
        <input type="text" id="phone" placeholder="+3816444444...">
      </div>

      <div class="info">
        <label for="address">Address</label>
        <input type="text" id="address" placeholder="Address...">
      </div>

      <div class="info">
        <label for="country">Country</label>
        <input type="text" id="country" placeholder="Country...">
      </div>
      <div class="info">
        <label for="city">City</label>
        <input type="text" id="city" placeholder="City...">
      </div>
  
  `;
}
