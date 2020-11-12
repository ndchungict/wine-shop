import DB from "../db/database.ts";
import {Order} from "../model/order.ts";

const orderCollection = DB.collection<Order>("orders");