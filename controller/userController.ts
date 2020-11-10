// @ts-ignore
import {Context, Status, STATUS_TEXT} from "https://deno.land/x/oak/mod.ts";
import {selectUserByPhone, saveUser} from "../repository/userRepo.ts";
import {Response} from "../helper/response.ts";
import {enscriptPass, verifyPass} from "../security/pass.ts";
import {genToken, getPayload} from "../security/jwt.ts";
import {parseToken} from "../helper/token.ts";
import {User} from "../model/user.ts";

export const signInHandler = async (context: Context) => {
    const body = await context.request.body()
    const reqData = await body.value

    //verify phone and password
    const user = await selectUserByPhone(reqData.phone);

    if (!user) {
        return Response(context, Status.NotFound, {
            status: Status.NotFound,
            message: STATUS_TEXT.get(Status.NotFound)
        });
    }

    const isInvalidPass = verifyPass(reqData.password, user.password);
    if (!isInvalidPass) {
        return Response(context, Status.Unauthorized, {
            status: Status.Unauthorized,
            message: STATUS_TEXT.get(Status.Unauthorized)
        });
    }

    return Response(context, Status.OK, {
        status: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
        profile: {
            displayName: user.displayName,
            avatar: user.avatar,
            phone: user.phone,
            token: await genToken({phone: user.phone})
        }
    });
};

export const signUpHandler = async (context: Context) => {
    const body = await context.request.body()
    const reqData = await body.value

    const user = await selectUserByPhone(reqData.phone);

    if (user) {
        return Response(context, Status.Conflict, {
            status: Status.Conflict,
            message: STATUS_TEXT.get(Status.Conflict)
        });
    }

    reqData.password = enscriptPass(reqData.password);
    const insertId = await saveUser(reqData);
    if (!insertId) {
        return Response(context, Status.InternalServerError, {
            status: Status.InternalServerError,
            message: STATUS_TEXT.get(Status.InternalServerError)
        });
    }

    return Response(context, Status.OK, {
        status: Status.OK,
        message: STATUS_TEXT.get(Status.OK)
    });
};

export const profileHandle = async (context: Context) => {
    const token = await parseToken(context);
    const payload = await getPayload(token);
    const phone = payload.phone;
    const user = await selectUserByPhone(phone);

    if (!user){
        return Response(context, Status.InternalServerError, {
            status: Status.InternalServerError,
            message: STATUS_TEXT.get(Status.InternalServerError)
        });
    }

    return Response(context, Status.OK, {
        status: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
        profile: {
            displayName: user.displayName,
            avatar: user.avatar,
            phone: user.phone
        }
    });
}