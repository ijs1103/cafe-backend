import client from "../../client";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        socialSignUp: async(_, {username, email, provider}) => {
                try {
                    const user = await client.user.findFirst({ where: { username } });
                    if(user?.provider==="kakao"){
                        const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
                        return {
                            ok: true,
                            token,
                        };
                    }
                    const existingEmail = await client.user.findFirst({ where: { email } });
                    if(existingEmail){
                        return {
                            ok: false,
                            error: "중복되는 이메일입니다.",
                        };
                    }
                    const newUser = await client.user.create({
                        data:{
                            username,
                            email,
                            provider,
                        }
                    });
                    const token = await jwt.sign({id: newUser.id}, process.env.SECRET_KEY);
                    return {
                        ok: true,
                        token,
                    };
                } catch (e){
                    return {
                        ok: false,
                        error: e,
                    };
                }
            }
    }
};