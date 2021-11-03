import client from "../../client";
import { processCategory, handleFile } from "../coffeeShops.utils";
import { protectedResolver } from "../../users/users.utils";
import { uploadPhoto } from "../../shared/shared.utils";

export default {
    Mutation: {
        createCoffeeShop: protectedResolver(async(_,{name,address,url,categoryName},{loggedInUser}) => {
            // connectOrCreate는 사실상 외래키 속성도 동시에 create 하려고 사용하는것
            // connectOrCreate의 where 조건절에는 필드가 하나만 있어야 한다
            try {
                let newUrl = null;
                if (url){
                    newUrl = await uploadPhoto(url, loggedInUser.id, "shop");
                }
                const existingShop = await client.coffeeShop.findFirst({
                    where: {
                        OR: [
                            {name},
                            {address}
                        ]
                    }
                });
                console.log(existingShop);
                if(existingShop){
                    return {
                        ok: false,
                        error: "존재하는 카페 이름 혹은 주소 입니다."
                    }
                }
                await client.coffeeShop.create({
                    data: {
                        name,
                        address,
                        user: {
                            connect:{
                                id: loggedInUser.id
                            }
                        },
                        ...(url && {photos: {
                            create:{
                                url: newUrl
                            }
                        }}),
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