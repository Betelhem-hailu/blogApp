const express = require('express');
const validator = require('validator');

const app = express();
app.use(express.json());

const validateRegistration = (req, res, next) => {
    const { name, email, password} = req.body;
    let errors = [];

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

    // Validate username (minimum length 5)
    if (!validator.isLength(name, { min: 5 })) {
      errors.push('Chosen display name must be at least 5 characters long');
    }

    if (!validator.isAlphanumeric(name)) {
      errors.push('Display name can consist of alphabets and numbers only');
    }

    // Validate email
    if (!validator.isEmail(email)) {
      errors.push('Please enter a valid email address');
    }

    // Validate password
    if (validator.isEmpty(password)) {
      errors.push('Please enter password');
    }

    if(!passwordRegex.test(password)) {
      errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
    }

    // If there are validation errors, return them to the user
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    next(); // Proceed to the next middleware or route handler if validation passes
  }

  module.exports = validateRegistration;