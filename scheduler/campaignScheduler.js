const cron = require('node-cron');
const Campaign = require('../models/Campaign');
const sendEmail = require('../utils/sendEmail');

const startScheduler = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();

    try {
      const campaigns = await Campaign.find({
        status: 'pending',
        scheduledTime: { $lte: now },
      });

      if (campaigns.length === 0) {
        console.log('No campaigns to send right now.');
        return;
      }

      console.log(`${campaigns.length} campaign(s) ready to send...`);

      for (const campaign of campaigns) {
        let logs = [];

        for (const email of campaign.recipients) {
          try {
            await sendEmail(email, campaign.title, campaign.message);
            console.log(`Email sent to ${email}`);
            logs.push({ email, status: 'success' });
          } catch (err) {
            console.error(`Failed to send email to ${email}: ${err.message}`);
            logs.push({ email, status: 'failure', error: err.message });
          }
        }

        campaign.status = 'sent';
        campaign.logs = logs;
        await campaign.save();

        console.log(`📨 Campaign "${campaign.title}" marked as sent.`);
      }
    } catch (error) {
      console.error('Error in scheduler:', error.message);
    }
  });
};

module.exports = startScheduler;
