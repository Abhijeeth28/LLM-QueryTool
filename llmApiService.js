const axios = require('axios');
const config = require('./config');

const llmApiClient = axios.create({
    baseURL: config.llmApiEndpoint,
    headers: {
        'Authorization': `Bearer ${config.llmApiKey}`,
        'Content-Type': 'application/json',
    },
});

module.exports = llmApiClient;