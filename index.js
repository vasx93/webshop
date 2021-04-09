require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./routes/apiRouter');

// Start the app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// Routes
app.use('/api/items', apiRouter);

app.use('/order-history', (req, res) => {
	res.sendFile(path.join(__dirname, './public/history.html'));
});
app.use('/user-checkout', (req, res) => {
	res.sendFile(path.join(__dirname, './public/checkout.html'));
});
app.use('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public/home.html'));
});

// MongoDB
mongoose
	.connect(process.env.DB_ATLAS, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB Atlas connection is running..'))
	.catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is live on port ${port}`));
