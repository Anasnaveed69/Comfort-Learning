Comfort Learning E-Commerce Website

Overview

Comfort Learning is a responsive e-commerce website designed to showcase and sell online courses. The site features a navigation bar, a hero banner, a product listing section, a shopping cart with quantity controls, and a footer. It uses HTML, CSS, JavaScript, and local storage to manage the cart, with products loaded from a JSON file.

Features





Responsive Design: Adapts to desktop, tablet, and mobile screens (breakpoints at 768px and 480px).



Navigation: Desktop navbar and mobile-friendly burger menu.



Product Listing: Displays courses with images, titles, prices, and "Add to Cart" buttons.



Shopping Cart: Sidebar with cart items, quantity controls (+/-), remove functionality, and total price calculation.



Footer: Includes company logo, navigation links, contact info, social media links, and copyright notice.



Local Storage: Persists cart data across page reloads.



Dynamic Products: Loads course data from products.json.

File Structure

comfort-learning/
├── index.html        # Main HTML file
├── app.css           # Stylesheet for layout and design
├── script.js         # JavaScript for interactivity (cart, menu, product loading)
├── products.json     # JSON file containing product data
└── images/           # Folder for product images and cover.jpg (not included)

Setup Instructions





Prerequisites:





A web browser (e.g., Chrome, Firefox).



A local server (e.g., http-server via Node.js) to serve files and avoid CORS issues.



Node.js installed (optional, for running a local server).



Installation:





Clone or download the project files to a local directory.



Ensure products.json is in the root directory and contains valid product data (see example below).



Place product images and cover.jpg in an images/ folder relative to the root.



Example products.json:

{
    "items": [
        {
            "sys": { "id": "1" },
            "fields": {
                "title": "Introduction to Python",
                "price": 1000,
                "image": { "fields": { "file": { "url": "images/python.jpg" } } }
            }
        },
        {
            "sys": { "id": "2" },
            "fields": {
                "title": "Web Development",
                "price": 1500,
                "image": { "fields": { "file": { "url": "images/webdev.jpg" } } }
            }
        }
    ]
}





Replace image URLs with actual paths to images in the images/ folder.



Running the Project:





Install http-server globally (if using Node.js):

npm install -g http-server



Navigate to the project directory and start the server:

http-server



Open a browser and visit http://localhost:8080 (or the port shown by http-server).



Alternatively, open index.html directly in a browser, but note that products.json fetching may fail due to CORS restrictions without a server.



Dependencies:





Font Awesome 6.5.1 (loaded via CDN in index.html for icons).



No additional JavaScript libraries are required.

Usage





Navigation: Use the navbar (desktop) or burger menu (mobile) to access Home, Courses, Pricing, and About Us.



Browsing Courses: Scroll to the "Courses We Offer" section or click "Shop Now" in the banner to view courses.



Adding to Cart: Click "Add to Cart" on a course. The button changes to "In Cart" and becomes disabled.



Cart Management:





Click the cart icon to open the cart sidebar.



Adjust quantities using "+" and "-" buttons.



Remove individual items by clicking "remove" links.



Clear all items with the "Clear Cart" button.



Click "Proceed" for a placeholder checkout alert (customize as needed).



Footer: Access quick links, contact info, or social media links at the bottom of the page.

Responsive Design





Desktop (>768px): Full navbar, grid-based product listing, multi-column footer.



Tablet (≤768px): Burger menu replaces navbar, footer sections stack, banner text shrinks.



Mobile (≤480px): Single-column product listing, smaller font sizes, full-width cart sidebar.

Troubleshooting





Products Not Loading: Ensure products.json is in the root directory and accessible. Check the browser console (F12) for fetch errors.



Images Not Displaying: Verify image paths in products.json and that cover.jpg exists in the images/ folder.



Cart Issues: Clear local storage (localStorage.clear()) in the browser console to reset the cart.



CORS Errors: Use a local server (http-server) instead of opening index.html directly.

Customization





Product Data: Update products.json with actual course data and image paths.



Checkout Logic: Replace the proceedBtn event listener in script.js with actual checkout functionality (e.g., redirect to a payment page).



Footer Links: Update social media and contact links in index.html with real URLs.



Styling: Modify colors (e.g., #418fab, #f0ad4e) in app.css to match your brand.

Notes





The "Proceed" button currently triggers an alert. Implement actual checkout logic as needed.



Social media links in the footer are placeholders (#). Replace with actual URLs.



The project assumes images are hosted locally. For production, consider hosting images on a CDN.



Tested as of June 18, 2025, with the provided code.

License

© 2025 Comfort Learning. All rights reserved.
