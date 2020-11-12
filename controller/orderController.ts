// @ts-ignore
import {Context, Status, STATUS_TEXT} from "https://deno.land/x/oak/mod.ts";
import {Response} from "../helper/response.ts";
import {selectWineById} from "../repository/wineRepo.ts";
import {parseToken} from "../helper/token.ts";
import {getPayload} from "../security/jwt.ts";

export const addToCartHandler = async (context:any) =>{
    const token = await parseToken(context);
    const payload = await getPayload(token);
    // @ts-ignore
    const {wineId} = context.params as {wineID:string};
    const wine = await selectWineById(wineId);

    if (!wineId){
        return Response(context, Status.NotFound, {
            status: Status.NotFound,
            message: STATUS_TEXT.get(Status.NotFound)
        });
    }
}