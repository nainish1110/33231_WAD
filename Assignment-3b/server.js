// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// User model
const User = mongoose.model('User', {
    name: String,
    email: String,
    age: Number
});

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
