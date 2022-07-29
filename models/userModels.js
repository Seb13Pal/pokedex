import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: String,
    firstname: {
        type: String,
        required: [true, ""]
    },
    mail: {
        type: String,
        required: [true, ""]
    },
    password: {
        type: String,
        required: [true, ""]
    }
})
const userModels = mongoose.model('User', userSchema)
export default userModels
