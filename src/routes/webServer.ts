import * as express from 'express'
import * as mongoose from 'mongoose'
import { Server, Socket } from "socket.io"
import userRoutes from './userRoutes/userRoutes'
import middleware from './serverMiddleware'
import websocket from '../websocket/websocket'
import { MONGO_URI, PORT } from '../config/keys'
import Organization from '../models/organization/organization'
import Lecturer from '../models/course/lecturer'
import InitColman from '../temp/initColman'
import Episode from '../models/course/episode'
import courseRoutes from './userRoutes/courseRoutes'
import { toObjectId } from '../tools/string'
import ILecturer from '../models/course/lecturer'
import Course from '../models/course/course'
const app = express()
let http = require("http").Server(app);
const io = new Server(http, {})

middleware(app)

io.attach(http)
io.on('connection', (socket: Socket) => websocket(socket))

mongoose.connect(MONGO_URI, { useNewUrlParser: true }, (err: any) => {
    if (err) console.log('Error on MongoDB connection', err)
    else console.log('Connected to MongoDB')
})

userRoutes(app)
export default http.listen(PORT, () => {
    console.log(`Server runs on ${PORT}`)
})

//Organization.find({}).exec().then(r => console.log(r))
//Lecturer.find({}).exec().then(r => console.log(r))
// InitColman(toObjectId('60d051cb36e313a7eb9381dc'))
 //Course.getByOrganizationId(toObjectId('60d051cb36e313a7eb9381dc')).then(r => {
     //console.log(r)
//})
// const course = Course.getByOrganizationId(toObjectId('60d051cb36e313a7eb9381dc'))
// console.log(course)
// //const episode = Episode.getBySeasonId(toObjectId('60d051cb36e313a7eb9381dc'))

// const trailer = 
//     `60ddbfd42c708f2ff5f5a99f 
//     60ddc1425d712c33b27cf39e 
//     60ddc2ceee01823751aa28e8
//     60ddc494e6e3d63e58e77eb7 
//     60ddc5b90fec814238fa0b6e 
//     60ddc6ad451976460e6aa8dc 
//     60ddc7a845fad549dbf49c54 
//     60ddc93fd8ac5e4eaae625fe 
//     60e14c834488e54c67daf897 
//     60ddcc0e1f97f5580c309277 
//     60ddcce49a2d3c5b5a2fb4f6`
// .split('\n').map(n => n.trim()).map(N => toObjectId(N))
// console.log(trailer)
Organization.find({}).exec().then(r => console.log(r))