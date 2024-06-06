import mongoose from "mongoose";

export default function connectDB() {
    mongoose.connect("mongodb://localhost:27017/racedb").then(r => {
        console.log("Connected to database! " + r.connection.name)
    }).catch(e => {
        console.log("ERROR while connecting to database!\n" + e)
    })
}
