Comfort Learning E-Commerce Website
📖 Overview
Comfort Learning is a responsive e-commerce website designed to showcase and sell online courses. It features:

A modern, responsive design

Interactive shopping cart with quantity management

Product listing powered by a JSON data file

Persistent cart storage via Local Storage

Fully functional navigation and footer sections

Built using HTML, CSS, JavaScript, with no external JS libraries except Font Awesome CDN for icons.

🚀 Features
Responsive Design — Adapts to desktop, tablet, and mobile views

Navigation Bar — Desktop navbar and burger menu for mobile

Hero Banner — "Shop Now" CTA directing to course listings

Product Listing — Displays courses (image, title, price, "Add to Cart")

Shopping Cart Sidebar — View cart, modify quantity, remove items, clear cart, total price calculation

Local Storage — Cart data persists between page reloads

Footer — Company info, navigation, contact, and social media links

Dynamic Products — Loaded from products.json

🗂️ File Structure
bash
Copy
Edit
comfort-learning/
├── index.html          # Main HTML file
├── app.css            # Stylesheet for layout and design
├── script.js          # JS for cart, menu, and product loading
├── products.json      # JSON file containing product data
└── images/            # Folder for product images and cover.jpg
⚙️ Setup Instructions
Prerequisites
Modern web browser (Chrome, Firefox, etc.)

Local server (like http-server via Node.js) — prevents CORS issues

Node.js (optional, for local server)

Installation
Clone or download the project to a local directory.

Ensure products.json exists in the root and contains valid data:

json
Copy
Edit
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
Place all course images and cover.jpg into the /images/ folder.

Running the Project
Install http-server (if using Node.js):

nginx
Copy
Edit
npm install -g http-server
Start server from project root:

pgsql
Copy
Edit
http-server
Visit http://localhost:8080 in your browser.

⚠️ Opening index.html directly without a server may cause CORS issues with products.json.

📦 Dependencies
Font Awesome 6.5.1 (via CDN in index.html)

No additional JavaScript libraries used

🖱️ Usage Guide
Navigation: Use the navbar or burger menu (mobile) for quick page access.

Browse Courses: Scroll or click "Shop Now" in the hero banner.

Add to Cart: Click "Add to Cart" to add a course (button disables afterward).

Cart Management:

Click cart icon to view items.

Adjust quantity via "+" and "–" buttons.

Remove an item with the "remove" link.

Clear cart using "Clear Cart" button.

"Proceed" button shows a checkout alert (customizable).

Footer: Access social media, contact info, and site links.

📱 Responsive Design Breakpoints
Device	Viewport Width	Features
Desktop	> 768px	Full navbar, grid products, multi-column footer
Tablet	≤ 768px	Burger menu, stacked footer sections
Mobile	≤ 480px	Single-column layout, smaller text, full-width cart

🛠️ Troubleshooting
Issue	Solution
Products not loading	Ensure products.json is valid and in root directory
Images missing	Check file paths in JSON and /images/ folder
Cart not resetting	Run localStorage.clear() in browser console
CORS error	Use a local server (e.g., http-server) instead of opening file directly

✨ Customization
Area	How to Customize
Product Data	Edit products.json (titles, prices, image paths)
Checkout Logic	Modify proceedBtn event listener in script.js
Footer Links	Update URLs in index.html
Colors & Styles	Edit variables (e.g., #418fab, #f0ad4e) in app.css

📌 Notes
"Proceed" currently triggers an alert — replace with real checkout functionality as needed.

Social media and contact links are placeholders (#) — update them with real URLs.

Images are expected to be local — for production, consider using a CDN.

📝 License
© 2025 Comfort Learning. All rights reserved.

