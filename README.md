# E-Commerce Product Catalog

A full-stack e-commerce product catalog built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication
- Product browsing and filtering
- Shopping cart functionality
- Responsive design
- RESTful API

## Tech Stack

- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/raycoffee/e-commerce-catalog.git
   ```

2. Install server dependencies
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables
   - Create a `.env` file in the server directory
   - Add necessary environment variables (see .env.example)

5. Run the development server
   ```bash
   # Run backend
   cd server
   npm run dev

   # Run frontend
   cd client
   npm start
   ```

## Project Structure

```
e-commerce-catalog/
├── client/                 # React frontend
│   ├── public/
│   └── src/
└── server/                # Node.js backend
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    └── routes/
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
