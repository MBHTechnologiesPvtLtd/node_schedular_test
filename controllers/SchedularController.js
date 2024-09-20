// controllers/schedularController.js
const axios = require('axios');

// Your list of APIs
const apiList = [
  { type: 'GET', apiName: 'https://delivery.click4delivery.in/Schedular/CheckNodeSchedular' }

];

// Track consecutive failure counts for each API
let failureCounts = {};
let intervalId;

// Function to call a specific API
async function callApi(api) {
  try {
    let response;

    if (api.type === 'GET') {
      response = await axios.get(api.apiName, { timeout: 30000 });
    } else if (api.type === 'POST') {
      response = await axios.post(api.apiName, api.data, { timeout: 30000 });
    }

    console.log(`${api.type} API (${api.apiName}) Response:`, new Date().toString());
    failureCounts[api.apiName] = 0; // Reset failure count on success
  } catch (error) {
    if (!failureCounts[api.apiName]) {
      failureCounts[api.apiName] = 0;
    }

    failureCounts[api.apiName]++;

    if (error.code === 'ECONNABORTED') {
      console.error(`${api.type} API (${api.apiName}) request timed out (10 seconds).`);
    } else {
      console.error(`Error calling ${api.type} API (${api.apiName}):`, error.message);
    }

    console.log(`${api.type} API (${api.apiName}) Failure count: ${failureCounts[api.apiName]}`);

    if (failureCounts[api.apiName] >= 5) {
      console.error(`${api.type} API (${api.apiName}) failed 5 consecutive times.`);
    }
  }
}

// Function to call all APIs in the list
async function callAllApis() {
  for (let api of apiList) {
    await callApi(api); // Call each API
  }
}

// Start scheduler function
const startScheduler = (req, res) => {
  if (intervalId) {
    return res.status(400).json({ message: 'Scheduler is already running.' });
  }

  intervalId = setInterval(callAllApis, 30000); // Call APIs every minute
  callAllApis(); // Call the APIs immediately when the scheduler starts

  res.status(200).json({ message: 'Scheduler started.' });
};

// Stop scheduler function
const stopScheduler = (req, res) => {
  if (!intervalId) {
    return res.status(400).json({ message: 'Scheduler is not running.' });
  }

  clearInterval(intervalId);
  intervalId = null;

  res.status(200).json({ message: 'Scheduler stopped.' });
};

module.exports = { startScheduler, stopScheduler };
