import {create, Payload, verify, Header,} from "https://deno.land/x/djwt/mod.ts";

export var key = "chungnd";

export const algorithm = "HS256";

export const header: Header = {
    alg: algorithm,
    typ: "JWT"
};

export const genToken = async (payload: Payload) => {
    return await create(header, payload, key);
}

export const getPayload = async (token: string) => {
    return await verify(token, key, algorithm)
}