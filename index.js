require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

// Start the app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

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
