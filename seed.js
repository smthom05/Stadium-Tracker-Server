const axios = require('axios');
let SERVER_URL = 'http://localhost:';
const PORT = process.env.PORT || 3000;
// Update server URL with port
SERVER_URL += PORT;

axios
  .get(SERVER_URL + '/locations')
  .then(res => {
    console.log(res.data);
  });
