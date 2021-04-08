const express = require('express');
const router = express.Router();
const Item = require('../models/item-model');

router.get('/', async (req, res) => {
	try {
		const items = await Item.find();

		if (!items || items.length === 0) {
			return res.status(400).send({ message: 'Something went wrong' });
		}

		res.status(200).json({ results: items.length, items });
	} catch (e) {
		return res.status(400).send(e.message);
	}
});

router.post('/', async (req, res) => {
	try {
		const item = await Item.create({ ...req.body });

		if (!item) {
			return res.status(400).send({ message: 'Something went wrong' });
		}

		res.status(201).json({ message: 'Successfuly created', item });
	} catch (e) {
		return res.status(400).send(e.message);
	}
});

module.exports = router;
