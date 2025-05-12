const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new Schema ({
    email: {
        type: String,
        unique: true,
        required: true
    },
    profileImg: {
        filename: String,
        url: {
            type: String,
            default:
                "https://res.cloudinary.com/djenv5out/image/upload/v1746716023/FjU2lkcWYAgNG6d_hf7ojd.jpg",
            set: (v) =>
                v === "" ? "https://res.cloudinary.com/djenv5out/image/upload/v1746716023/FjU2lkcWYAgNG6d_hf7ojd.jpg": v,
        },
    }
});

imageTransform = "c_thumb,g_face,h_200,w_200/r_max/f_auto";
// adds username, hash & salt, and other methods
userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', userSchema);