import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://victor5ndu_db_user:victor5ndu_db_user1@cluster0.s9jowin.mongodb.net/?appName=Cluster0');
    console.log('mongodb is connected successfully')
  } catch (err) {
    console.log("MongoDB connection failed", err);
    process.exit(1)
  }
};

export default connectToDB;
