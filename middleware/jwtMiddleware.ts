import {Context, Status} from "https://deno.land/x/oak/mod.ts";
import {Response} from "../helper/response.ts";
import {getPayload} from "../security/jwt.ts";

export const jwtMiddleware = async (context: Context, next: any) => {
    const headers: Headers = context.request.headers;
    const authorization = headers.get("Authorization");

    if (!authorization) {
        return Response(context, Status.Unauthorized, {
            status: Status.Unauthorized,
            message: "Invalid Jwt Token"
        })
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return Response(context, Status.Unauthorized, {
            status: Status.Unauthorized,
            message: "Invalid Jwt Token"
        })
    }

    if ( await getPayload(token)){
       await next();
       return ;
    }

    return Response(context, Status.Unauthorized, {
        status: Status.Unauthorized,
        message: "Invalid Jwt Token"
    })
}