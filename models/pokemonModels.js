import mongoose from 'mongoose'
const pokemonSchema = new mongoose.Schema({
    name: String,
    firstname: {
        type: String,
        required: [true, ""]
    },
    level: {
        type: String,
        required: [true, ""]
    },
    type: {
        type: String,
        required: [true, ""]
    },
    trainer: {
        type: String,
        required: [true, ""]
    }
})
const pokemonModels = mongoose.model('Pokemon', pokemonSchema)
export default pokemonModels;