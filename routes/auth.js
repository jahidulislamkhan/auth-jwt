const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validtion');

// User registration
router.post('/register', async (req, res) => {
    // Validate request
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details);
    // Check if the email already exists or not
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('The email you provided already exists');
    // Hash psssword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

// User login
router.post('/login', async (req, res) => {
    // Validate request
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details);
    // Check if the user exists or not by this email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email was not found");
    const validPassowrd = await bcrypt.compare(req.body.password, user.password);
    if (!validPassowrd) return res.status(400).send('Invalid Password');
    // Generate token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;
