import client from "../../client";
import { processCategory, handleFile } from "../coffeeShops.utils";
import { protectedResolver } from "../../users/users.utils";
import { uploadPhoto } from "../../shared/shared.utils";

export default {
    Mutation: {
        createCoffeeShop: protectedResolver(async(_,{name,latitude,longitude,url,categoryName},{loggedInUser}) => {
            // connectOrCreate는 사실상 외래키 속성도 동시에 create 하려고 사용하는것
            // connectOrCreate의 where 조건절에는 필드가 하나만 있어야 한다
            try {
                let newUrl = null;
                let photoObj = null;
                if (url){
                    // newUrl = await handleFile(url, loggedInUser.id);
                    newUrl = await uploadPhoto(url, loggedInUser.id, "shop");
                }
                await client.coffeeShop.create({
                    data: {
                        name,
                        ...(latitude&&{latitude}),
                        ...(longitude&&{longitude}),
                        user: {
                            connect:{
                                id: loggedInUser.id
                            }
                        },
                        url: newUrl,
                        categories: {
                            connectOrCreate: processCategory(categoryName)
                        }
                    }
                });
                return {
                    ok: true,
                };
            } catch (e) {
                return {
                    ok: false,
                    error: e
                };
            }
        })
    }
};