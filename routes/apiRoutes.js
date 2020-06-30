const fs = require("fs");


module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        fs.readFile("../db/db.json", "utf8", function(error, data) {

            if (error) {
              return console.log(error);
            }
          
            console.log(data);
            res.json(data);
          
          })
        
      });

    
}