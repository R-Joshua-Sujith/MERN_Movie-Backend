const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema(
    {
        src: { type: String, required: true },
        name: { type: String, required: true },
        desc: { type: String, required: true },
        rating: { type: String, required: true },
        category: { type: String, required: true },
        link: { type: String, required: true }
    }
)

const MovieModel = mongoose.model("movies", MovieSchema);

module.exports = MovieModel