import mongodb from "mongodb"

let pokedex

export default class UsersDAO { 

    static async injectDB(conn){
        console.log("initializing pokedex db")
        if (pokedex) { 
            return
        }
        try {
            pokedex = await conn.db(process.env.POKEDEX_NS).collection("users")
        } catch (e){
            console.error(
                `Unable to establish a connection handle in restaurantsDAO: ${e}`,
            )
        }
    }

    static async addUser(username, password){
        try{
            const user = {
                name: username, 
                password: password,
            }
            return await pokedex.insertOne(user)
        }
        catch (e){
            console.error(`Unable to post user: ${e}`)
            return { error: e}
        }
    }
}