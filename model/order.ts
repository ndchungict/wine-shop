import {Wine} from "./wine.ts";
import {OrderStatus} from "./orderStatus.ts";

export interface Order {
    phone: any;
    wine: Wine[];
    status: OrderStatus
}