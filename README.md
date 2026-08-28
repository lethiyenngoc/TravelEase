# TravelEase – Tour Booking Management System

TravelEase is a web-based tour booking and management system built with Node.js, Express.js, MongoDB, and Pug.

The system provides a customer-facing website for searching and booking tours, along with an administration portal for managing tours, orders, customers, administrator accounts, permissions, and business statistics.

This application is also used as the **System Under Test (SUT)** for the [TravelEase-QA](https://github.com/lethiyenngoc/TravelEase-QA) testing portfolio.

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- BcryptJS
- Joi

### Frontend

- Pug
- HTML
- CSS
- JavaScript
- TinyMCE
- Chart.js

### Services & Integrations

- Cloudinary
- Nodemailer / OTP
- VNPay
- ZaloPay

### Development Tools

- Git
- Yarn
- Nodemon
- Visual Studio Code

---

## Main Features

### Customer Website

- Browse domestic and international tours
- Search and filter tours
- View tour details and itineraries
- View related tour recommendations
- Add tours to cart
- Manage ticket quantities
- Create tour bookings
- View booking information
- Online payment integration with VNPay and ZaloPay
- Contact the travel service
- Subscribe for promotional information

### Administration Portal

- Administrator authentication
- Forgot password and OTP verification
- Tour category management
- Tour management
- Create and update tour information
- Tour trash, restore, and permanent deletion
- Order management
- Order invoice generation
- Loyal customer statistics
- Customer management
- Dashboard and revenue statistics
- Best-selling tour statistics
- Website information management
- Administrator account management
- Role and permission management
- Role-Based Access Control (RBAC)
- Administrator profile management

---

## Architecture

The application follows the **Model–View–Controller (MVC)** architecture.

```text
Client
   |
   v
Express Routes
   |
   v
Controllers
   |
   v
Models / Mongoose
   |
   v
MongoDB
   |
   v
Pug Views
```

The separation between Models, Views, and Controllers helps organize business logic, data access, and user interfaces independently.

---

## Project Structure

```text
TravelEase/
├── config/
├── controllers/
│   ├── admin/
│   └── client/
├── helpers/
├── middlewares/
│   ├── admin/
│   └── client/
├── models/
├── public/
│   ├── admin/
│   └── assets/
├── routes/
│   ├── admin/
│   └── client/
├── validates/
│   └── admin/
├── views/
│   ├── admin/
│   └── client/
├── index.js
├── package.json
├── yarn.lock
├── .env.example
└── README.md
```

> `node_modules/` and `.env` are local files and are not included in the public project structure.

---

## Environment Configuration

Application configuration is managed through environment variables.

Create a local `.env` file based on:

```text
.env.example
```

Environment variables are used for configuration such as:

- MongoDB connection
- JWT authentication
- Email / OTP service
- Cloudinary media storage
- VNPay payment integration
- ZaloPay payment integration

Sensitive local credentials should not be committed to source control.

---

## Installation

### 1. Install dependencies

```bash
yarn install
```

### 2. Configure environment variables

Create a `.env` file based on `.env.example` and provide the required local configuration.

### 3. Start the application

```bash
yarn start
```

The application runs locally at:

```text
http://localhost:3000
```

---

## QA & Testing

TravelEase is used as a practical **System Under Test (SUT)** for a separate QA portfolio project.

### TravelEase-QA

**Repository:** [TravelEase-QA](https://github.com/lethiyenngoc/TravelEase-QA)

The QA project demonstrates an end-to-end testing workflow including:

- Test Scenario Design
- Manual Test Cases
- Test Execution
- Bug Reporting
- Smoke Testing
- API Testing with Postman
- Selenium Web UI Automation
- TestNG Regression Testing
- Page Object Model (POM)
- Maven
- Allure Reporting
- Automatic Failure Screenshot Capture
- Known Defect Reproduction
- Role-Based Access Control Testing

The application source code and QA project are maintained in separate repositories so that the application implementation and testing approach can be reviewed independently.

---

## Deployment

The application was designed for deployment using:

- **Render** – Node.js application hosting
- **MongoDB Atlas** – Cloud database
- **Cloudinary** – Media storage

Environment-specific configuration is separated from the application source code using environment variables.

---

## Project Purpose

TravelEase was developed to apply software development concepts including:

- System analysis and design
- Client–Server architecture
- MVC architecture
- MongoDB database design
- Authentication and authorization
- Role-Based Access Control
- Tour booking workflow
- Payment integration
- Administrative management
- Dashboard and business statistics

The project also serves as the application under test for a practical QA portfolio covering **Manual Testing, API Testing, and Automation Testing**.

---

## Related Repository

For the complete testing portfolio of this application:

### [TravelEase-QA – Manual, API & Automation Testing](https://github.com/lethiyenngoc/TravelEase-QA)