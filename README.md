# Virtual Event Platform Backend

This is a Node.js + Express backend for a Virtual Event Platform that allows:

- User Registration & Login (with role: organizer/user)
- JWT-based Authentication
- Organizers to Create, Update, Delete Events
- Users to Register for Events
- Email notifications (via Nodemailer)



##  Tech Stack

- Node.js
- Express.js
- bcryptjs
- jsonwebtoken
- dotenv
- nodemailer (Gmail SMTP)
- In-memory storage (can be upgraded to a DB like MongoDB)

---

## Folder Structure

virtual-event-platform/

── backend/
    ── index.js # Entry point
 ── controllers/ # Auth & Event logic
 ── routes/ # API route definitions
 ── middleware/ # JWT auth middleware
 ── utils/ # Email sending utility
 ── data/store.js # In-memory data store

── .env # Environment variables
── package.json
── README.md


---

## Setup Instructions

1. **Clone the repository:**

   bash
   git clone https://github.com/yourusername/virtual-event-platform.git
   cd virtual-event-platform
2. Install dependencies:
npm install

3. Create .env file:

PORT=3000
    JWT_SECRET=jwt_secret_here
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password_here

4. Run the server: npm run dev
   The API will be running at: http://localhost:3000

5. API Endpoints

Method   	    Endpoint	                Description	                             Auth  Required


POST	        /api/auth/register	        Register user/organizer	                    not


POST	        /api/auth/login	            Login + JWT token	                        not


GET	            /api/events	                List all events	                            not
POST	        /api/events	                Create an event (organizer only)	        yes
PUT	            /api/events/:id	            Update event (organizer only)	            yes
DELETE	        /api/events/:id	            Delete event (organizer only)	            yes
POST	        /api/events/:id/register    Register for an event (user)	            yes



Run Tests
No test cases included yet.
You can manually test APIs using tools like Postman or Thunder Client.


Notes
1. This project uses in-memory storage — data will reset on server restart.
2. Easily extendable to use MongoDB or PostgreSQL in future versions.
