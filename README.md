# Project README: E-Commerce Website with MongoDB, D3.js Graphs, User Authentication, and Admin Panel

<img width="1800" alt="Screenshot 2023-08-30 at 19 07 13" src="https://github.com/OmerYaakov/webECom/assets/21014429/a70feb02-4f07-48dd-94a5-3ead0dc7a7e5">

This README provides an overview of the **E-Commerce Website** developed by Nir, Eilon, Aviv, Omer as part of our degree project. The project integrates various technologies such as **EJS**, **MongoDB Atlas**, **D3.js**, **User Authentication**, **MVC Design Pattern**, **Encryption**, **Bootstrap**,**BingMaps API**, and an **Admin Panel** to create a dynamic and interactive e-commerce platform.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [User Guide](#user-guide)
- [Admin Guide](#admin-guide)
- [Contributors](#contributors)

## Project Overview

Our project is an e-commerce platform designed to manage and visualize product data using EJS templates, backed by a MongoDB Atlas database. It incorporates interactive D3.js graphs to provide insightful data representation. User authentication ensures secure access, while an exclusive admin panel grants administrators additional control over the platform's functionalities. The project follows the **MVC (Model-View-Controller)** design pattern for organized development.

## Features

- **User Authentication:**
  - Users can create accounts and log in securely.
  - Passwords are encrypted before being stored in the database.
  - Sessions and passwords are managed using encryption techniques.

- **Product Management:**
  - Registered users can search, add, and view products.
  - Users can add products to their shopping cart for later checkout.

- **D3.js Graphs:**
  - Utilizes D3.js library to create interactive and visually appealing graphs.
  - Graphs are used to represent various product-related data for better insights.

- **Admin Panel:**
  - Admin-exclusive access to a control panel.
  - Admins can manage products, branches, user accounts, and access additional features.

## Technologies Used

- Frontend: **EJS**, **HTML**, **CSS**, **JavaScript**, **Bootstrap**, **jQuery**, **AJAX**
- Backend: **Node.js**, **Express.js**
- Database: **MongoDB Atlas**, **Mongoose**
- Graphs: **D3.js**
- Maps: **BingMaps API**

## Installation

1. Clone the repository: `git clone https://github.com/OmerYaakov/webECom.git`
2. Navigate to the project directory: `cd webECom`
3. Install dependencies: `npm install`

## Usage

1. Rename `.env.example` to `.env` and add your MongoDB Atlas credentials and other configuration details.
2. Start the server: `npm start`
3. Access the web application in your browser: `http://localhost:8080/`

## User Guide

<img width="1800" alt="Screenshot 2023-08-30 at 19 17 01" src="https://github.com/OmerYaakov/webECom/assets/21014429/d3bfa334-6d9a-4d46-aac6-bf7b8e5e6792">

1. Register for an account using username and password.
2. Log in with your credentials.
3. Browse and search for products.
4. Add products to your cart.
5. Review your cart and proceed to checkout.

## Admin Guide

1. Log in as an admin using admin credentials.
2. Access the admin control panel.
3. Manage products: add, edit, or delete products.
4. Manage user accounts: view user details, disable accounts if necessary.
5. Perform any additional admin-specific tasks.

## Contributors

- Nir
- Eilon
- Aviv
- Omer
