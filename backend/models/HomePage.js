import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  message: { type: String, required: true },   // 👈 client message
  name: { type: String, required: true },      // 👈 client name
  position: { type: String, required: true },  // 👈 client position
  photo: { type: String, required: true }      // 👈 client photo URL
});

const homePageSchema = new mongoose.Schema({
  about: {
    title: String,
    description: String,
    image: String,
  },
  stats: {
    Cows_Rescued: Number,
     Active_Volunteers: Number,
    Years_of_Service: Number,
    Successful_Adoptions: Number,
  },
  testimonials: [testimonialSchema]  // 👈 Multiple testimonials stored here
});

export default mongoose.model("HomePage", homePageSchema);
