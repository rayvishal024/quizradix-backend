import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// mongoDB URI
const DBURL = process.env.DB_URI;
const DBNAME = process.env.DB_NAME;

// check name & url
if (!DBURL || !DBNAME) {
     throw new Error("DB_URL or DB_NAME is missing in environment variables");
}

// connect methode
const connDB = async () => {
     try {
          await mongoose.connect(`${DBURL}/${DBNAME}`, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          })

     } catch (error) {
          console.log("DB Connection Error", error.message);
          process.exit(1);
     }

}

export default connDB;