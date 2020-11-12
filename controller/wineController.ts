// @ts-ignore
import {Context, Status, STATUS_TEXT} from "https://deno.land/x/oak/mod.ts";
import {Response} from "../helper/response.ts";
import {Wine} from "../model/wine.ts";
import {saveWine, selectWineByCate, selectWineById} from "../repository/wineRepo.ts";

export const wineListHandler = async (context: Context) => {
    const cates = [
        {
            "cateId": "1",
            "cateName": "wine 1"
        },
        {
            "cateId": "2",
            "cateName": "wine 2"
        },
        {
            "cateId": "3",
            "cateName": "wine 3"
        },
        {
            "cateId": "4",
            "cateName": "wine 4"
        },
        {
            "cateId": "5",
            "cateName": "wine 5"
        },
        {
            "cateId": "6",
            "cateName": "wine 6"
        }
    ];

    return Response(context, Status.OK, {
        status: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
        data: cates
    });
}

export const addWineHandler = async (context: Context) => {
    const body = await context.request.body();
    const wine: Wine = await body.value;

    if (!wine) {
        return Response(context, Status.BadRequest, {
            status: Status.BadRequest,
            message: STATUS_TEXT.get(Status.BadRequest),
        });
    }

    const insertId = await saveWine(wine);

    if (!insertId) {
        return Response(context, Status.ExpectationFailed, {
            status: Status.ExpectationFailed,
            message: STATUS_TEXT.get(Status.ExpectationFailed),
        });
    }

    return Response(context, Status.OK, {
        status: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
    });

}

export const wineDetailHandler = async (context: any) => {
    const {id} = context.params as { id: string };
    if (!id){
        return Response(context, Status.BadRequest, {
            status: Status.BadRequest,
            message: STATUS_TEXT.get(Status.BadRequest),
        });
    }

    // @ts-ignore
    const wine: Wine = await selectWineById(id);

    if (!wine){
        return Response(context, Status.NotFound, {
            status: Status.NotFound,
            message: STATUS_TEXT.get(Status.NotFound),
        });
    }

    return Response(context, Status.OK, {
        status: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
        data: wine
    });
}

export const wineCateHandler = async (context: any) => {
    const {id} = context.params as {id:string};

    const wine:Wine[] = await selectWineByCate(id);

    return Response(context, Status.OK, {
        status: Status.OK,
        message: STATUS_TEXT.get(Status.OK),
        data: wine
    });
}