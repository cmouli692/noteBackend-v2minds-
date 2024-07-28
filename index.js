const sqlite3 = require("sqlite3").verbose()
const express = require("express")
const path = require("path")
const cors = require("cors")
const {open} = require("sqlite")


app = express()

const port = 3001

app.use(cors())

const corsOptions = {
    origin : "http://localhost:3000",
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials : true,
}

const dbPath = path.join(__dirname,"notes.db")

let db = null 

const initializeDBAndServer = async() => {

    try{
        db = await open({
                filename :dbPath,
                driver : sqlite3.Database
            })

        await db.run("CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY , note TEXT ,title TEXT);");
        
         

        app.listen(port,() => {
            console.log(`server is running at ${port}`)
        })
    
    }catch(error){ 
        console.log(`DB Error: ${error.message}`)

    }
    
}



initializeDBAndServer()

app.post("/", async(request,response) => {
    console.log(request)
    const {noteObject} = request.body
    const {id,note,title} = noteObject

    const createNoteQuery = `INSERT INTO notes (id,note,title) VALUES ("${id}","${note}","${title}");`

    await db.run(createNoteQuery)
})
















