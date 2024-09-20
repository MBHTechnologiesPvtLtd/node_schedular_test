require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json()); // for parsing application/json
const userRoutes = require('./routes/UserRoutes');
const schedularRoutes = require('./routes/SchedularRoutes');

// Use the user routes
app.use('/User', userRoutes);
// Use the scheduler routes
app.use('/scheduler', schedularRoutes);


const schedularController = require('./controllers/SchedularController');
schedularController.startScheduler(null, { 
    status: (code) => ({ json: (message) => console.log(`Scheduler started on app startup: ${message.message}`) })
  });


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
