const fs = require("fs");

let notes = []
module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
      console.log("GET")
        fs.readFile("./db/db.json", "utf8", function(error, data) {

            if (error) {
              return console.log("ERROR:", error);
            }
          
            console.log("DATA:", data);
            notes = JSON.parse(data)
            res.json(notes);
          
          })
        
      });

    app.post("/api/notes", function(req, res) {
      console.log("POST")
        console.log(req.body)
        const newNote = req.body
        fs.readFile("./db/db.json", "utf8", function(error, data){
          if (error) {
            return console.log("ERROR:", error);

          } 
          const dataObject = JSON.parse(data)
          const index = dataObject.length -1 
          const lastID = dataObject[index].id 
          console.log(lastID)
          console.log(index)
          newNote.id = lastID + 1
          notes.push(newNote)
          fs.writeFile("./db/db.json", JSON.stringify(notes), function(error, data){
            res.json(data)

          })
        })
          

      });

    app.delete("/api/notes/:id", function(req,res) {
      console.log(req.params)
      const id = req.params.id 
      fs.readFile("./db/db.json","utf8",function(error,data){
        if (error) {
          return console.log("ERROR:", error);
        }
        const parseData = JSON.parse(data)
        var index = parseData.findIndex(function(notes){
          return notes.id === id 
        })
      })
      res.send ("")
    })
    

    
}