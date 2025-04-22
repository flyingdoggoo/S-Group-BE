import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config(); 

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if(!uri || !dbName)
{
    throw new Error("MongoDB URI or DB Name not provided")
}

const client = new MongoClient(uri);
var db = null;

async function connectDB(){
    try
    {
        await client.connect();
        console.log("Connected to MongoDB");
        
        return client.db(dbName);
    }
    catch(error)
    {
        console.log("Error connecting to MongoDb: ", error);
        throw error;
    }
}
const getDB = async () =>  {
    db = await connectDB();
    if(!db)
    {
        throw new Error("Database not connected");
    }
    return db;
}
export default {connectDB, getDB};


