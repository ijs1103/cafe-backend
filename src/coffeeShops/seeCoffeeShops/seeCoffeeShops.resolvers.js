import client from "../../client";

export default {
    Query: {
        seeCoffeeShops: async(_,{offset, limit, sort}) => 
            await client.coffeeShop.findMany({
                include: {user: true, categories: true, photos: true},
                take: limit,
                skip: offset,
                ...(sort==="name" ? {orderBy: {name: "asc"}} : {orderBy: {createdAt: "desc"}}),
            })
        
    }
};