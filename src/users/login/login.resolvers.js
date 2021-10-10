import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
    Mutation: {
        login: async (_, { username, password }) => {
            const user = await client.user.findFirst({ where: { username } });
            if(!user) {
                return {
                    ok: false,
                    error: "아이디가 존재하지 않습니다.",
                };
            }
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "아이디는 존재하지만 비밀번호는 틀립니다.",
                };
            }
            const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            };
        },
    },
};