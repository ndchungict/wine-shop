// @ts-ignore
import { MongoClient } from "https://deno.land/x/mongo@v0.13.0/mod.ts";
// vsjPw3Bmzfs1Y3Py
const client = new MongoClient();
client.connectWithUri("mongodb+srv://ndchungict:vsjPw3Bmzfs1Y3Py@cluster0.ixdib.mongodb.net/wineshop?retryWrites=true&w=majority");
const db = client.database("wineshop");
export default db;
