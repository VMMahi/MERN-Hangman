import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { Cars } from "./models/carsModel.js"
import mongoose from "mongoose";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.get("/api/cars", async (req, res) => {
    const cars = await Cars.find({});



    res.status(200).json(cars);
})

app.post("/newcar", async (req, res) => {
    const {name} = req.body;

    try {
        const savedCar = await Cars.create({name});
        res.status(200).json(savedCar);
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
    
})

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to db"))

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})