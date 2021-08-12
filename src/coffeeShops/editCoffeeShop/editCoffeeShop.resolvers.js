import client from "../../client";
import { processCategory, handleFile } from "../coffeeShops.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        editCoffeeShop: protectedResolver(async(_,{
            id,
            category,
            newShopName,
            latitude,
            longitude,
            url,
            },{loggedInUser}) => {

                try {
                    let newUrl = null;

                const shop = await client.coffeeShop.findUnique({
                    where:{
                        id
                    },
                    select:{
                        UserId: true
                    }
                });
                if(!shop){
                    return {
                        ok: false,
                        error: "Not existing coffeeShop"
                    }
                }
                if (shop.UserId !== loggedInUser.id) {
                    return {
                        ok: false,
                        error: "Not Authorized"
                    }
                }

                const updateShop = await client.coffeeShop.update({
                    where:{
                        id
                    },
                    data:{
                        ...(newShopName && {name: newShopName}),
                        ...(latitude && {latitude}),
                        ...(longitude && {longitude}),
                        ...(category && {
                            categories: {
                                disconnect: shop.categories,
                                connectOrCreate: processCategory(category),
                            }
                        })
                    }
                });

                if (url) {
                    newUrl = handleFile(url, loggedInUser.id);
                    await client.coffeeShopPhoto.create({
                        data: {
                            url: newUrl,
                            shop: {
                                connect: {
                                    id
                                }
                            }
                        }
                    })
                }
                return {
                    ok: true
                };    
            } catch (error) {
                return {
                    ok: false,
                    error: `${error}`,
                };
            }       
        })
    }
};
