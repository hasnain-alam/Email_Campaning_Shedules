const express = require('express');
const app = express(); // ✅ define this early

const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const campaignRoutes = require('./routes/campaignRoutes');
const startScheduler = require('./scheduler/campaignScheduler');

// Load env
dotenv.config();

// Connect MongoDB and start scheduler
connectDB();
startScheduler();

// ✅ Setup view engine AFTER app is declared
app.engine('handlebars', exphbs.engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Body parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/', campaignRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
