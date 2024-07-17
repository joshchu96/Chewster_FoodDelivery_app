-- Drop DB if exists
DROP DATABASE IF EXISTS chewster;

-- Create the new database
CREATE DATABASE chewster;

-- Connect to the new database
\c chewster

-- Drop the table if it exists
DROP TABLE IF EXISTS food;

-- Create the new food table
CREATE TABLE food (
    _id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL
);

-- Drop the user table if it exists
DROP TABLE IF EXISTS "user";

-- Create the new user table
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    cartdata JSONB DEFAULT '{}'::jsonb
);

-- Insert food data
INSERT INTO food (name, image, price, description, category) VALUES
('Greek salad', 'food_1.png', 12, 'Food provides essential nutrients for overall health and well-being', 'Salad'),
('Garden Fresh Mix', 'food_2.png', 18, 'Food provides essential nutrients for overall health and well-being', 'Salad'),
('Clover Salad', 'food_3.png', 16, 'Food provides essential nutrients for overall health and well-being', 'Salad'),
('Chicken Salad', 'food_4.png', 24, 'Food provides essential nutrients for overall health and well-being', 'Salad'),
('Lasagna Rolls', 'food_5.png', 14, 'Savor our Lasagna Rolls: tender pasta sheets rolled with rich ricotta, savory ground beef (or vegetarian filling), and signature marinara sauce, topped with melted mozzarella, delivered fresh and hot!', 'Rolls'),
('Peri Peri Rolls', 'food_6.png', 12, 'Spicy Peri Peri chicken (or veggie option) wrapped in a soft roll with crisp lettuce and juicy tomatoes, delivering bold flavors to your doorstep!', 'Rolls'),
('Chicken Rolls', 'food_7.png', 20, 'Tender chicken wrapped in a soft, savory roll, a delicious choice for any occasion!', 'Rolls'),
('Vegetarian Rolls', 'food_8.png', 15, 'Delight in our veggie rolls: fresh, flavorful vegetables wrapped in a soft, savory roll, perfect for a tasty and satisfying meal!', 'Rolls'),
('Raspberry Sorbet Ice Cream', 'food_9.png', 14, 'Indulge in the luscious blend of creamy vanilla ice cream infused with tangy raspberry swirls, offering a refreshing burst of fruity sweetness with every spoonful.', 'Desserts'),
('Fruit Ice Cream', 'food_10.png', 22, 'Food provides essential nutrients for overall health and well-being', 'Desserts'),
('Jar Ice Cream', 'food_11.png', 10, 'Food provides essential nutrients for overall health and well-being', 'Desserts'),
('Vanilla Ice Cream', 'food_12.png', 12, 'Food provides essential nutrients for overall health and well-being', 'Desserts'),
('Chicken Sandwich', 'food_13.png', 12, 'Food provides essential nutrients for overall health and well-being', 'Sandwich'),
('BLT Sandwich', 'food_14.png', 18, 'Savor our classic BLT Sandwich, crafted with crispy bacon, fresh lettuce, juicy tomatoes, and creamy mayo, nestled between slices of toasted bread for a timeless flavor combination.', 'Sandwich'),
('Avocado Sandwich', 'food_15.png', 16, 'Enjoy our Avocado Sandwich, featuring creamy avocado slices paired with fresh vegetables, tangy dressing, and hearty whole-grain bread for a satisfying and nutritious meal option.', 'Sandwich'),
('Banh Mi Sandwich', 'food_16.png', 24, 'A fusion of French-inspired baguette and Vietnamese flavors, our Banh Mi Sandwich boasts savory meats or tofu, pickled vegetables, fresh cilantro, and spicy mayo, delivering a delightful burst of taste in every bite.', 'Sandwich'),
('Cup Cake', 'food_17.png', 14, 'Food provides essential nutrients for overall health and well-being', 'Cake'),
('Vegan Cake', 'food_18.png', 12, 'Food provides essential nutrients for overall health and well-being', 'Cake'),
('Butterscotch Cake', 'food_19.png', 20, 'Food provides essential nutrients for overall health and well-being', 'Cake'),
('Sliced Cake', 'food_20.png', 15, 'Food provides essential nutrients for overall health and well-being', 'Cake'),
('Garlic Mushroom', 'food_21.png', 14, 'Food provides essential nutrients for overall health and well-being', 'Vegan'),
('Fried Cauliflower', 'food_22.png', 22, 'Food provides essential nutrients for overall health and well-being', 'Vegan'),
('Mix Veg Pulao', 'food_23.png', 10, 'Food provides essential nutrients for overall health and well-being', 'Vegan'),
('Rice Zucchini', 'food_24.png', 12, 'Food provides essential nutrients for overall health and well-being', 'Vegan'),
('Cheese Pasta', 'food_25.png', 12, 'Food provides essential nutrients for overall health and well-being', 'Pasta'),
('Tomato Pasta', 'food_26.png', 18, 'Food provides essential nutrients for overall health and well-being', 'Pasta'),
('Creamy Pasta', 'food_27.png', 16, 'Food provides essential nutrients for overall health and well-being', 'Pasta'),
('Chicken Pasta', 'food_28.png', 24, 'Food provides essential nutrients for overall health and well-being', 'Pasta'),
('Butter Noodles', 'food_29.png', 14, 'Food provides essential nutrients for overall health and well-being', 'Noodles'),
('Veg Noodles', 'food_30.png', 12, 'Food provides essential nutrients for overall health and well-being', 'Noodles'),
('Somen Noodles', 'food_31.png', 20, 'Food provides essential nutrients for overall health and well-being', 'Noodles'),
('Cooked Noodles', 'food_32.png', 15, 'Food provides essential nutrients for overall health and well-being', 'Noodles');

