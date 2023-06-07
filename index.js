const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require("cors");
const MovieModel = require('./models/Movie')

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => console.log(err));

app.get("/getMovies", async (req, res) => {
    try {
        const users = await MovieModel.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

app.post("/addMovie", async (req, res) => {
    const newMovie = new MovieModel({
        src: req.body.src,
        name: req.body.name,
        desc: req.body.desc,
        rating: req.body.rating,
        category: req.body.category,
        link: req.body.link
    });

    try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        res.status(500).json(err);
    }
})

app.get("/movie/:id", async (req, res) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete("/deleteMovie/:id", async (req, res) => {
    try {
        await MovieModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Movie");
    } catch (err) {
        res.status(500).json(err);
    }
});

app.put("/editMovie/:id", async (req, res) => {
    try {
        const updatedMovie = await MovieModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedMovie);
    } catch (err) {
        res.status(500).json(err);
    }

})


app.listen(5000, () => {
    console.log("Backend Server is Running");
})