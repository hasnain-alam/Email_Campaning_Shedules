const express = require('express');
const Campaign = require('../models/Campaign');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ scheduledTime: -1 });
    res.render('list', { campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error.message);
    res.status(500).send('Server Error: Unable to load campaigns');
  }
});

router.get('/new', (req, res) => {
  res.render('home');
});

router.post('/create', async (req, res) => {
  const { title, message, recipients, scheduledTime } = req.body;
  const emailList = Array.isArray(recipients)
    ? recipients.map(e => e.trim())
    : recipients.split(',').map(e => e.trim());

  await Campaign.create({
    title,
    message,
    recipients: emailList,
    scheduledTime,
  });

  if (req.headers['content-type'] === 'application/json') {
    return res.status(201).json({ message: 'Campaign created successfully' });
  }

  res.redirect('/');
});

module.exports = router;