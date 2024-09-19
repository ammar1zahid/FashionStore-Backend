


# FashionStore Backend

This is the backend for the FashionStore application, built with Node.js, Express, and MongoDB. This backend provides RESTful APIs for handling user authentication, product management, order processing, and payment integration using Stripe.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ammar1zahid/FashionStore-Backend.git
   cd FashionStore-Backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set up the following environment variables with your credentials:

   ```bash
   MONGO_URI="mongoDb URI"
   PORT=5000
   JWT_KEY="KEY"
   STRIPE_KEY="your-stripe-key"
   EMAIL_USER="your-email"
   EMAIL_PASS="your-email-password"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000` by default.

### API Endpoints

The backend exposes the following main API endpoints:

- **User Authentication**: `/api/auth`
- **Product Management**: `/api/products`
- **Order Processing**: `/api/orders`
- **Payment Integration**: `/api/payments`

### Features

- **User Authentication**: Secure authentication using JWT.
- **Product Management**: CRUD operations for products.
- **Order Processing**: Handle user orders and manage order statuses.
- **Stripe Payment Integration**: Process payments securely using Stripe.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Stripe](https://stripe.com/)
```


