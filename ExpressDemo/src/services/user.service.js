import db from '../database/mongodb.js'
import { ObjectId } from "mongodb"
const mongoDB = await db.getDB()
const userCollection = mongoDB.collection("users")

const GetAll = async (filter = {}) => {
    const users = await userCollection.find(filter).toArray();
    return users;
}

const GetById = async (id) => {
    const objectId = new ObjectId(id);
    const user = await userCollection.findOne({ _id: objectId });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

const Post = async (body) => {
    const newUser = {
        name: body.name,
        email: body.email,
        age: body.age,
        gender: body.gender,
        isActive: body.isActive,
        joinedAt: new Date(),
        roles: body.roles ?? ["user"]
    }
    const result = await userCollection.insertOne(newUser);
    return {...newUser, _id: result.insertedId};
}

const PutById = async (id, body) => {
   const objectId = new ObjectId(id);
   console.log(`[Service PutById] Received ID string: "${id}" (Type: ${typeof id})`)
   console.log(`[Service PutById] Constructed ObjectId: ${objectId}`);
   const result = await userCollection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnDocument: 'after' }
   );
   console.log('[Service PutById] findOneAndUpdate raw result:', result);
    if (!result) {
         throw new Error("User not found");
    }
    return result;
}

const DeleteById = async (id) => {
    const objectId = new ObjectId(id);
    const result = await userCollection.findOneAndDelete({ _id: objectId });
    if (!result) {
        throw new Error("User not found");
    }
    return result;
}

const GetByField = async (field, value) => {
    const query = {}; 
    if (field === '_id') {
        if (!ObjectId.isValid(value)) return [];
        query[field] = new ObjectId(value);
    }
    else if (field === 'age') {
        const numericValue = parseInt(value, 10); 
        if (!isNaN(numericValue)) {
            query[field] = numericValue; 
        } else {
            console.warn(`Could not parse age value "${value}" as number.`);
            return []; 
        }
    }
     else if (field === 'isActive') {
         if (value.toLowerCase() === 'true') {
             query[field] = true;
         } else if (value.toLowerCase() === 'false') {
             query[field] = false;
         } else {
             return []; 
         }
     }
    else {
        query[field] = value; 
    }

    const users = await userCollection.find(query).toArray();
    return users;
};

export default {
    GetAll,
    GetById,
    Post,
    PutById,
    DeleteById,
    GetByField
}
