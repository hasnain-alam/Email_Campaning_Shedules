📧 Email Campaigning Scheduler
A simple backend application built with Node.js, Express, and MongoDB to schedule and send bulk email campaigns.

🚀 Features
✅ Create email campaigns (title, message, recipient list)

⏰ Automatically schedule and send campaigns

📬 Uses SMTP for email delivery (via Nodemailer)

🧾 Stores campaign data in MongoDB

📊 Logs delivery success or failure

🛠️ Tech Stack
Node.js

Express

MongoDB

Nodemailer

Mongoose

dotenv

📂 Folder Structure
bash
Copy
Edit
email_campaning_sheduler/
├── app.js               # Entry point
├── config/              # Database & mail config
├── models/              # MongoDB schemas
├── routes/              # API routes
├── scheduler/           # Email scheduler logic
├── utils/               # Helper functions
├── views/               # Optional templates or frontend (if any)
├── .gitignore
├── .env (ignored)
├── package.json
📦 Installation
bash
Copy
Edit
git clone https://github.com/hasnain-alam/Email_Campaning_Shedules.git
cd Email_Campaning_Shedules
npm install
⚙️ Setup .env
Create a .env file in the root folder and add:

ini
Copy
Edit
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=465
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password_or_app_pass
MONGO_URI=mongodb://localhost:27017/email_scheduler
✅ Note: Don’t commit .env — it’s in .gitignore.

▶️ Run the Project
bash
Copy
Edit
node app.js
Server will start on: http://localhost:3000

📤 Sending a Campaign
Use a REST client like Postman to call:

bash
Copy
Edit
POST /api/campaigns
Body (JSON):

json
Copy
Edit
{
  "title": "Hello Users!",
  "message": "Thanks for subscribing.",
  "recipients": ["user1@example.com", "user2@example.com"]
}
🧑‍💻 Author
Md Hasnain Alam
GitHub: hasnain-alam
