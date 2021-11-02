import client from "../../client";

export default {
    Query: {
        seeShopById: async(_,{UserId}) => await client.coffeeShop.findMany({
            include: {user: true, categories: true, photos: true},
            where: {
                UserId
            }})
    }
};