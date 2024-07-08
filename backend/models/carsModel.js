import mongoose from "mongoose";

const carsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export const Cars = mongoose.model("cars", carsSchema);