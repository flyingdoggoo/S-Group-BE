import mongoose from "mongoose";

class Database{
    async Connect(ConnectionString)
    {
        try{
            mongoose.set("debug", true)
            mongoose.set("debug", {color: true})
            await mongoose.connect(ConnectionString)
            console.log("Đã kết nối db")
        }
        catch(error){
            console.log("Lỗi khi kết nối db: ", error)
        }
    }
    static getInstance()
    {
        if(!Database.instance)
            Database.instance = new Database()
        return Database.instance
    }
}
const db = Database.getInstance()

export default db