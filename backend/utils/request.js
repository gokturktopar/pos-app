const axios = require('axios');
const config = require("../config/default")
const https = require('https')
const instance = axios.create({
  baseURL: config.apiUrl,
  headers: config.apiHeaders,
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
module.exports = instance