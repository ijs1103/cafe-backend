import client from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount: async(_, {username,
            email,
            name,
            location,
            password,
            avatarURL,
            githubUsername}) => {
                try {
                    const existingUser = await client.user.findFirst({
                        where:{
                            OR: [
                                {username},
                                {email},
                            ]
                        }
                    });
                    if(existingUser){
                        throw new Error("This username/password is already taken.");
                    }
                    const hashedPw = await bcrypt.hash(password, 10);
                    await client.user.create({
                        data:{
                            username,
                            email,
                            name,
                            location,
                            password: hashedPw,
                            avatarURL,
                            githubUsername,
                        }
                    });
                    return {
                        ok: true
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