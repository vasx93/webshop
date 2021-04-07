const fs = require('fs');
const express = require('express');
const router = express.Router();

const Item = require('../models/item-model');

// Homepage
router.get('/', async (req, res) => {
	try {
		const items = await Item.find();

		if (!items) {
			return res.status(400).render('_error', {
				title: 'Something went wrong!',
				msg: 'No items for now, come back later!',
			});
		}

		res.status(200).render('home', {
			title: 'Home',
			items,
		});
	} catch (e) {
		res.status(400).render('_error', {
			title: 'Something went wrong',
			msg: e.message,
		});
	}
});

router.get('/orderHistory', async (req, res) => {
	try {
		// load all items from histyory json

		const items = JSON.stringify(fs.readFile('../orderHistory.js'));
		if (!items) {
			return res.status(404).render('_error', {
				title: 'Something went wrong!',
				msg: 'No items for now, come back later!',
			});
		}

		res.status(200).render('orderHistory', {
			title: 'Order History',
			items,
		});
	} catch (e) {
		res.status(400).render('_error', {
			title: 'Something went wrong',
			msg: e.message,
		});
	}
});

router.get('/userCheckout', async (req, res) => {
	try {
		//Load all items added to cart

		if (!items) {
			return res.status(404).render('_error', {
				title: 'Something went wrong!',
				msg: 'No items for now, come back later!',
			});
		}

		res.status(200).render('userCheckout', {
			title: 'User Checkout',
			items,
		});
	} catch (e) {
		res.status(400).render('_error', {
			title: 'Something went wrong',
			msg: e.message,
		});
	}
});

module.exports = router;
