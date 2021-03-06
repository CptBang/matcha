const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Crate Schema
const UserSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  // username: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //     unique: true,
  //     minlength: 6,
  //     maxlength: 16,
  //     match: /^[a-z0-9-_]+$/
  // },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  lastLogin: {
    type: String,
    default: Date.now
  },
  age: {
    type: Number,
    default: 18
    //required: true
  },
  certifiedBaldie: {
    type: Boolean,
    default: false
  },
  blocked: [{ type: Schema.Types.ObjectId, ref: "User", default: "[]" }],
  email: {
    type: String,
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  enableLocation: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true,
    match: /^(?=.*\d).{4,8}/
  },
  media: [{ type: String, default: "[]" }],
  isValidated: {
    type: Boolean,
    default: false
  },
  receiveEmails: {
    type: Boolean,
    default: true
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", default: "[]" }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: "User", default: "[]" }],
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other"
  },
  fameRate: {
    type: Number,
    default: 0
  },
  sexualPreference: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other"
  },
  bio: {
    type: String,
    //minlength: 10,
    maxlength: 420,
    default: "Im lonely"
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  baldTags: [{ type: String, default: "[]" }],
  conversations: [
    { type: Schema.Types.ObjectId, ref: "Conversation", default: "[]" }
  ],
  notifications: [
    {
      notificationType: {
        type: String,
        enum: ["like", "match", "message", "viewed"],
        default: "like"
      },
      from: { type: Schema.Types.ObjectId, ref: "User" }
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
