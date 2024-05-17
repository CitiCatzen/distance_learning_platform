//Modules config
const mongoose = require("mongoose");
const validator = require("validator");
const ageToBirth = require("age-to-birth-date");

//Mongoose schema config
const userSchema = new mongoose.Schema({
    avatar: {
        type: Buffer
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "The name must contain a minimum of 3 characters!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E ]*$/igm))
                throw new Error("The name of the course must contain alphabetic characters!");
        }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "The name must contain a minimum of 3 characters!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E ]*$/igm))
                throw new Error("The name of the course must contain alphabetic characters!");
        }
    },
    birthDate: {
        type: Date,
        required: true,
        validate(value){
            const latestFor18YearsOld = ageToBirth.latestBirthDateForAge(18);
            const is18YearsOld = value < latestFor18YearsOld;
            if(!is18YearsOld)
                throw new Error("You must be of legal age to register an account!"); 
        }
    },
    streetName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "The street name must contain a minimum of 3 characters!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E0-9\s,'-]*$/gmi))
                throw new Error("The street name must contain alphanumeric characters and a special character \"-\"!");
        }
    },
    streetNum: {
        type: String,
        required: true,
        min: [1, "The street number must contain a minimum of one numeric character!"],
        validate(value){
            if(!validator.matches(value, /^[0-9]*$/gmi))
                throw new Error("The street number must contain alphanumeric characters!");
        }
    },
    postalCode: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isPostalCode(value, "any"))
                throw new Error("The postal code is not valid!");
        }
    },
    municipality: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "The name of the city/county must contain a minimum of 3 characters!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E\s,'-]*$/igm))
                throw new Error("The name of the municipality/district may include alphabetic characters and a special character\" -\"!");
        }
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "The name must contain a minimum of 3 characters!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E\s,'-]*$/igm))
                throw new Error("The name of the city can include alphabetic characters and a special character\" -\"!");
        }
    },
    country: { 
        type: String,
        required: true,
        trim: true,
        minlength: [3, "The country name must contain a minimum of 3 characters!"],
        validate(value){
            if(!validator.matches(value, /^[a-z\u0161\u0111\u010D\u0107\u017E ]*$/igm))
                throw new Error("The name of the country can contain alphabetic characters!");
        }
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        min: [6, "Phone numbers are too short!"],
        validate(value){
            if(!validator.isMobilePhone(value, "any"))
                throw new Error("The phone number is not valid!");
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("The e-mail address is not valid!");
        }
    }
}, {
    timestamps: true
});


//Exprting mongoose model
module.exports = mongoose.model("User", userSchema);