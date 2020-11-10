import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export const enscriptPass = (stringToHash: string) => {
    return bcrypt.hashSync(stringToHash);
}

export const verifyPass = (inputPassword: string, hash: string) => {
    return bcrypt.compareSync(inputPassword,hash);
}