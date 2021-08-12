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
                        throw new Error("This username/email is already taken.");
                    }
                    const hashedPw = await bcrypt.hash(password, 10);
                    await client.user.create({
                        data:{
                            username,
                            email,
                            name,
                            ...(location&&{location}),
                            password: hashedPw,
                            ...(avatarURL&&{avatarURL}),
                            ...(githubUsername&&{githubUsername}),
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