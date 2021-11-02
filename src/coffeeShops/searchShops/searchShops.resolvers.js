import client from "../../client";

export default {
    Query: {
        searchShops: async (_, { offset, limit, keyword }) =>
        client.coffeeShop.findMany({
            include: {user: true, categories: true, photos: true},
            where:{
                name: {
                    startsWith: keyword.toLowerCase(),
                },
            },
            take: limit,
            skip: offset,
            orderBy: {
                createdAt: "desc"
            },
        })
    }
};