const path = require('path');

module.exports= function (app) {
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, "../public/index.html"));
  });
// app.get('/survey', function(request, response) {
//     response.sendFile(path.join(__dirname, "../public/order.html"));
//   });
};