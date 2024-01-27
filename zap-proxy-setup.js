// proxy-config.js
const axios = require('axios');

// Configurar axios para usar el proxy de ZAP
axios.defaults.proxy = {
  host: '127.0.0.1',
  port: 8080
};

// Exportar la configuración para que pueda ser usada en otros archivos
axios.get('http://localhost:3000')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });