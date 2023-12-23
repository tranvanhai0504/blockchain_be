const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const productRoutes = require('./routes/productRoutes');
const db = require('./Confign/mgDB');
const path = require('path');

app.use(cors()); // Correctly invoke cors middleware
const port = process.env.PORT || 3000;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Use bodyParser to handle JSON data
app.use(bodyParser.json());

// Welcome route
app.get('/', (req, res) => {
    const welcomePagePath = path.join(__dirname, 'public', 'welcome.html');
    res.sendFile(welcomePagePath);
});

// Product routes
app.use('/api/v1/product', productRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
