const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 15 },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQIGAwUHBP/EADoQAAIBAwAGBQkGBwAAAAAAAAABAgMEEQUGEiExQRNRkaGxMlJhYnFygcHhFCIjM0JzFSQ0NWPR8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9xAAAAAADiuayoUnN7OF50sIDkyYVK9Kks1akYe88Gs3ml7qtKUadVQhw/D3Z+PE62UnJtybb63xA3T7dauLca8JY5ReX2HxS0/ZxbS6V+yJq3HiRgbVQ09Z1JqMnOnnnNbjtFJSScXlPg0aAdjofSk7KrGnUbdvJ715vpQG3g4lc0HLZ6antdW2snKAAAAAAAAAAAAAAcVxWhb0Z1ajxGCyzUr++q3tXanugvJhncvqdzrNJq1pJPCdTeuvca4wDZiwQAyMMxYBkYZGBHjHA77Vi+qfaJWtWcpQlHMNp8GuXZ4HQNn1aKuKdtfUqlWOYKS+9zj6V/3BsDfARPJQAAAAAAAAAAA6LWh/h2/vP5GvM2LWlfy9CXVNru+hrgBkYZiwDIwyMA2YthsgAnMMQ31IrraKPRqfkr2IyIlgpAAAAAAAAAAAHUazR2tHxl5tWL8V8zVT7tLXlW5u6qlN9HGbUI53YR8OQIyMNkbANmLYbIAIw2YtlBnNZR6S+t4edVgu9HAybTTynhrg0B6WinR6qXtW6tatKvNzlSktmUuOy19Gd4QAAAAAAAAAABoV2nG6rRa3qpJPtOE7rWSwlSru7pp9FPy8LyZdfxOjyBWzFsNkAEYbMWygyMMjYEbI2GxThOrUjTpRc5yeFGPFgbPqUns3cuWYrxNnOv0HYfw6wjRl+ZJ7VR+sdgQAAAAAAAAAABGsrD4Gt602kacKFelCMYpuEtlY4718zZT5762jeWtShPhNYT6nyYGgEZlXpzoVpUqqxOLaaONlBkYbI2BGyNhsxAyjGU5xhBZlJpJelnotlZ0rWhShCEVKEFFyS3vC6zVdVNHu4u/tc4vo6Pk55y+huS4EFAAAAAAAAAAAAAAABrmttpTVCF3FYqqSg/WXpNXNw1u/tcf3V4M05sojZi2VsxAGdGHS3FKm3hTnGOVyy8GByWf9dbfvQ8UEejWltTtKEKFGOzTgsJHMQpFAAAAAAAAASclGLk3hJZbZq2kdY605uFliFNPG21ly/wBAbS2kst4R8Vzpewtsqpcwcl+mL2n3GlV7u5uHmvXqT9EpPHYcAG03OtNFZVtbzm+Tm9lHVXOsOkK2VGcKK/xx39rOqI2UZ1ritWltVqs6j65SbOFsrZiAIUxbCDIw2RsD67fSt/a46G6qqPmyltLsZ2trrddU8K5oU6q645izXGyNgb3a616OrYVbpKEn58crtR21veW10s21elVXqTTPLQm4vMW01zTwFesg81tdPaTtWti7qTS/TV++u83DV/T0NLRdOpFU7mCy4p7pLrRB3QJlFA6nWW4dHRclHc6klD4c/A03Js+uEsW9tHrm33fU1YAyBkbKI2RsjZABARhBkYZi2AbMWw2RgGRggAjDMWwDZ9ehrp2mlbWsnhKolL2Pc+5nxNmMm1FtcUsoD2D4gRe1FNcwRWua4/l2nvS+RrLIAIzFlBRgwABGYsAIjMWABiyMACEYAEZiwAMWYz8mXsAA9fo/kw91eAAIr//Z",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  let user = this;
  let token = await jwt.sign({ _id: user._id }, "devTinder");
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  let user = this;
  let valid = await bcrypt.compare(password, user.password);
  return valid;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
