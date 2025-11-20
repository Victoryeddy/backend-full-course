import mongoose from "mongoose";
// import { seed } from "../../seedProducts.js";
const connectToDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://vic-ndu-test-user:${process.env.MONGODB_PASSWORD}@cluster0.s9jowin.mongodb.net/?appName=Cluster0`);
    // await seed();
    console.log('mongodb is connected successfully')
    // process.exit(0)
  } catch (err) {
    console.log("MongoDB connection failed", err);
    process.exit(1)
  }
};

export default connectToDB;
