import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        unfollow: protectedResolver(async(_, {username}, {loggedInUser}) => {
            const ok = await client.user.findUnique({
                where: { username },
            });
            if (!ok){
                return {
                    ok: false,
                    error: "유저가 존재하지 않습니다.",
                };
            }
            await client.user.update({
                where: {
                    id: loggedInUser.id,
                },
                data: {
                    following: {
                        disconnect: {
                            username,
                        },
                    },
                },
            });
            return {
                ok: true,
            };
        })
    },
};