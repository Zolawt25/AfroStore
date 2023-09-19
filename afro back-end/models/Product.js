const mongoose = require('mongoose');
const uuid = require('uuid');

const id = uuid.v4()

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "must provide name"],
    },
    id:{
        type: String,
        default: id
    },
    price:{
        type: String,
        required: [true, "must provide price"],
    },
    category:{
        type: String,
        enum:['phone', 'laptop', 'game', 'tv', 'vehicle', 'fashion'],
        required: [true, "must provide category"],
    },
    description:{
        type: String,
        required: [true, "must provide description"],
    },
    location:{
        type: String,
        enum:["Addis Abeba", "Adama", "Bahir Dar", "Hawassa", "Jimma", "Mekele", "Gonder"],
        required: [true, "must provide category"],
    },
    img:{
        type: Array,
        required: [true, "must provide image"]
    },
    phone:{
        type: String,
        required: [true, "must provide phone number"]
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        // required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Product", productSchema)