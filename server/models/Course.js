//Modules config
const mongoose = require("mongoose");
const validator = require("validator");

//Mongoose schema config
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "The course name must contain a minimum of 3 characters!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E ]*$/gmi))
                throw new Error("The course name must contain alphabetic characters!");
        }
    },
    moduleName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "The module name must contain a minimum of 3 characters!"],
        validate(value){
            if(!validator.matches(value, /^[a-z0-9\u0161\u0111\u010D\u0107\u017E ]*$/gmi))
                throw new Error("The module name must contain alphanumeric characters!");
        }
    },
    moduleDuration: {
        type: Number,
        required: true,
        min: [5, "The minimum length of the video must be more than 5 minutes!"]
    },
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecturer",
        required: true
    }
}, {
    timestamps: true,
});

//Exporting mongoose model
module.exports = mongoose.model("Course", courseSchema);