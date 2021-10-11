import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        follow: protectedResolver(async(_, {username}, {loggedInUser}) => {
            const ok = await client.user.findUnique({ where: {username}, select: {id: true} });
            if (!ok) {
                return {
                    ok: false,
                    error: "팔로우 할 유저가 존재하지 않습니다.",
                };
            }
            if (ok.id===loggedInUser.id) {
                return {
                    ok: false,
                    error: "나 자신을 팔로우 할 수 없습니다.",
                }
            }
            await client.user.update({
                where: {
                    id: loggedInUser.id,
                },
                data: {
                    following: {
                        connect: {
                            username,
                        },
                    },
                },
            });
            return {
                ok: true,
            };
        }),
    },
};