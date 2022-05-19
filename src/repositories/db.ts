import {MongoClient} from 'mongodb'
import {PhotoDBType, UserDBType} from './types'

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri);

let db = client.db("instagram")

export const photosCollection = db.collection<PhotoDBType>('photos')
export const usersCollection = db.collection<UserDBType>('users')

export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected successfully to mongo server");

    } catch {
        console.log("Can't connect to db");
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
