import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
    Mutation: {
        login: async(_,{username, password}) => {
            const existingUser = await client.user.findUnique({
                where:{
                    username
                }
            });
            if(!existingUser){
                return {
                    ok: false,
                    error: "user not found"
                };
            }
            const passwordOk = bcrypt.compare(password, existingUser.password);
            if(!passwordOk){
                return {
                    ok: false,
                    error: "password error"
                };
            }
            const token = await jwt.sign({id: existingUser.id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            };
        }
    }
};