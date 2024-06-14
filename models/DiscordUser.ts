import {IUser, IUserRace} from "../public/types";
import mongoose from "mongoose";
const ObjectId = require("mongoose").ObjectId

const userRaceSchema = new mongoose.Schema<IUserRace>({
    race_id: {type: ObjectId, required: true},
    vehicle_id: {type: ObjectId, required: true},
    position_qualifying_overall: {type: Number, required: true},
    position_race_overall: {type: Number, required: true},
    position_qualifying_class: {type: Number, required: false},
    position_race_class: {type: Number, required: false},
});

const userSchema = new mongoose.Schema<IUser>({
    discordId: {type: String, required: true},
    username: {type: String, required: true},
    last_login: {type: Number, required: false},
    register_date: {type: Number, required: true, default: Date.now()},
    races: {type: [userRaceSchema], required: true, default: []}
});

const DiscordUser= module.exports = mongoose.model<IUser>('User', userSchema);
