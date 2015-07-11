var express = require('express');
var app = express();
port = process.argv[2] || 8000;
 
app.configure(function () {
    app.use("/", 
        express.static(__dirname + '/client') 
    );
});
app.listen(port); //the port you want to use
console.log("Express server running at => http://localhost:" + port + "/\nCTRL + C to shutdown");
