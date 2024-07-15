--Drop DB if exits
DROP DATABASE IF EXISTS chewster;
--create the new database
CREATE DATABASE chewster;


--connect to the new database
\c chewster 

--Drop the table if it exists
DROP TABLE IF EXISTS food;

--Create the new food table
CREATE TABLE food(
    _id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL
)

