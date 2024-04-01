import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express() 

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const server = createServer(app)
const socketIO = new Server(server)

socketIO.on('connection', (socket) => {
    console.log("User is connected to server!!");

    socket.on("messageSomething", (reqObj) => {
        console.log("Log data send from user : ", JSON.stringify(reqObj, null, 2));
        socketIO.emit("messageSomething", reqObj)
    })
})

app.get('/', (req, res) => {
    res.redirect('/board')
})

app.get('/board', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(9000, () => {
    console.log("This app listening on port 9000!");
})