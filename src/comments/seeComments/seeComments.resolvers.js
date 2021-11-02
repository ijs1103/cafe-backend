import client from "../../client";

export default {
    Query: {
        seeComments: async(_,{offset, limit, shopId}) => await client.comment.findMany({
            where: {
                shopId
            },
            take: limit,
            skip: offset,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: true
            }
        }),
    }
};