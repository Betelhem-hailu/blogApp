const express = require('express');
const validator = require('validator');

const app = express();
app.use(express.json());

const validatePostCreation = (req, res, next) => {
    const {title, content, tags} = req.body;
    const coverImage = req.files?.coverImage?.[0]; 
    let errors = [];

    // Validate username (minimum length 5)
    if (!validator.isLength(title, { min: 10 })) {
      errors.push('Chosen title must be at least 10 characters long');
    }

    if (!validator.isLength(content, { min: 250 })) {
      errors.push('Content must be at least 250 characters long');
    }

    try {
        const tagNames = JSON.parse(tags); // Parse tags if sent as a JSON string
        console.log(tagNames);
        if (!Array.isArray(tagNames) || tagNames.length === 0) {
            errors.push('Please provide at least one tag');
        }
    } catch (err) {
        errors.push('Invalid tags format. Tags must be a valid JSON array');
    }

    // Validate cover image
    if (!coverImage) {
        errors.push('Cover image is required');
    } else if (!coverImage.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        errors.push('Cover image must be a valid image file (jpg, jpeg, png, gif)');
    }

    // If there are validation errors, return them to the user
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    next(); // Proceed to the next middleware or route handler if validation passes
  }

  module.exports = validatePostCreation;