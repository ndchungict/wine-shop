import DB from "../db/database.ts";
import {Wine} from "../model/wine.ts";

const wineCollection = DB.collection<Wine>("wines")

export const saveWine = async (wine: Wine) => {
    return await wineCollection.insertOne(wine);
}

export const selectWineById = async (wineId: string) => {
    return await wineCollection.findOne({
        _id: {
            "$oid": wineId
        }
    })
}