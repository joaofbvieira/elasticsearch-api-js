const axios = require('axios');

const httpClient = axios.create({
    baseURL: 'http://localhost:9200'
});

module.exports = httpClient;
