import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        follow: protectedResolver(async(_, {username}, {loggedInUser}) => {
            const ok = await client.user.findUnique({ where: {username}, select: {id: true} });
            if (!ok) {
                return {
                    ok: false,
                    error: "user does not exist",
                };
            }
            if (ok.id===loggedInUser.id) {
                return {
                    ok: false,
                    error: "Can't follow yourself",
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