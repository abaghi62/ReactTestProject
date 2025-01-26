Shopping Cart Application

This is a React-based shopping cart application designed for a seamless e-commerce experience. The application includes features like user authentication, product browsing, cart management, and order placement, all integrated with a RESTful API.
Features

    User Authentication: Login system with validation and local storage for session persistence.
    Product Listing: Displays products retrieved dynamically from a backend API.
    Shopping Cart:
        Add items to the cart.
        Remove items from the cart.
        View the total count and price of selected items.
    Order Checkout:
        Place orders with cart items.
        Redirects to a login page if the user is not authenticated.
    Responsive Design: Optimized for various screen sizes.

Technologies Used

    Frontend: React, React Router, Axios
    State Management: Context API, Local Storage
    Styling: Bootstrap, Custom CSS
    Backend API:
        GET /products for product listing
        POST /login for user authentication
        POST /orders for order placement
