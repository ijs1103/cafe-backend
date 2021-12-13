import client from "../../client";

export default {
    Query: {
        seeMyLikes: async(_,{userId}) => await client.like.findMany({
            where: {
                userId
            },
            include: {
                shop: true,
                user: true,
                shop: {
                    include: {
                        categories: true,
                        photos: true,
                        user: true,
                    }
                }
            }
        }),
    }
};