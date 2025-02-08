# WasteWise - Waste Management System

WasteWise is a comprehensive waste management platform designed to connect waste collectors, vendors, and users in an efficient and eco-friendly manner. This platform aims to streamline waste collection, recycling, and disposal processes while promoting environmental sustainability.

## Features

### User Features
- **User Authentication**: Secure sign-up and login with email/password or Google.
- **Product Management**: Users can add, view, and manage waste products.
- **Vendor Interaction**: Users can view vendor details, schedule pickups, and contact vendors.
- **Waste Tracking**: Track waste collection and disposal history.
- **Map Integration**: View waste collection routes and vendor locations on an interactive map.

### Vendor Features
- **Vendor Registration**: Vendors can register with detailed business information.
- **Service Management**: Vendors can manage their services, operating areas, and waste types.
- **Performance Metrics**: Track completed pickups, ratings, and reviews.
- **Certifications**: Showcase certifications and compliance standards.

### Admin Features
- **User Management**: Approve or reject vendor registrations.
- **Product Management**: Monitor and manage all waste products listed on the platform.
- **Analytics**: View platform usage statistics and performance metrics.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Flowbite**: A component library built on top of Tailwind CSS.
- **Redux**: A state management library for managing global state.
- **React Router**: A library for routing in React applications.
- **Leaflet**: A JavaScript library for interactive maps.

### Backend
- **Node.js**: A JavaScript runtime for building scalable network applications.
- **Express**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for secure user authentication.
- **Puppeteer**: A Node.js library for web scraping and automation.

### Deployment
- **Vite**: A fast build tool for modern web applications.
- **Nodemon**: A utility for automatically restarting the Node.js server during development.

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v6 or higher)
- Git

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wastewise.git
   cd wastewise
   ```

2. **Install dependencies**
   ```bash
   cd Backend
   npm install
   cd ../Frontend
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the `Backend` directory and add the following variables:
     ```env
     MONGODB_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
   - Create a `.env` file in the `Frontend` directory and add the following variables:
     ```env
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     ```

4. **Run the application**
   - Start the backend server:
     ```bash
     cd Backend
     npm run dev
     ```
   - Start the frontend development server:
     ```bash
     cd Frontend
     npm run dev
     ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- **Leaflet**: For providing an excellent mapping library.
- **Flowbite**: For the beautiful UI components.
- **Puppeteer**: For making web scraping and automation easy.

## Contact

For any questions or feedback, please reach out to us at [your-email@example.com](mailto:your-email@example.com).

---

**WasteWise** - Making waste management smarter and greener! 🌱
