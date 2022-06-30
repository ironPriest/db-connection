import {ObjectId} from 'mongodb'
import {UserDBType} from './types'
import {usersCollection} from './db'

export const usersRepository = {
    async getUsers(): Promise<UserDBType[]> {
        return usersCollection.find({}).toArray()
    },
    async getUser(id: ObjectId): Promise<UserDBType | null> {
        let foundedUser = usersCollection.findOne({_id: id})
        return foundedUser
    },

    // shitcode goes below
    async createUser(userName: string, description: string): Promise<UserDBType> {
        let justAddedUser
        /* await ? */usersCollection.insertOne(justAddedUser = {_id: new ObjectId(), userName: userName, description: description, addedAt: new Date()})
        return justAddedUser
    },
    // shitcode ends here
    async updateUser(id: ObjectId, userName: string, description: string): Promise<boolean> {
        let user = usersCollection.find({_id: id})
        if (user) {
            /* await? */usersCollection.updateOne({_id: id}, {$set: {userName: userName, description: description}})
            return true
        } else {
            return false
        }
    },
    /*
    Delete user and all his photos
     */
    async deleteUser(id: ObjectId): Promise<boolean> {
        let user = usersCollection.find({_id: id})
        if (user) {
            /* await? */usersCollection.deleteOne({_id: id})
            return true
        } else {
            return false
        }
    }
}
