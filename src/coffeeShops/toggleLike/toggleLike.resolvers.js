import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
            const myShop = await client.coffeeShop.findFirst({
                where: {
                    id,
                    UserId: loggedInUser.id
                },
            });
            if(myShop){
                return {
                    ok: false,
                    error: "내 카페는 좋아요 누를 수 없습니다."
                }
            }
            const shop = await client.coffeeShop.findFirst({
                where: {
                    id,
                    NOT: {UserId: loggedInUser.id}
                },
            });

            const likeWhere = {
                shopId_userId: {
                    userId: loggedInUser.id,
                    shopId: id,
                },
            };
            const like = await client.like.findUnique({
                where: likeWhere,
            });
            // 좋아요 있으면 삭제, 없으면 생성
            if (like) {
                await client.like.delete({
                    where: likeWhere,
                });
            } else {
                await client.like.create({
                   data: {
                    user: {
                        connect: {
                            id: loggedInUser.id,
                        },
                    },
                    shop: {
                        connect: {
                            id: shop.id,
                        },
                    },
                   },
                  
                });
            }
            return {
                ok: true,
            };
        }),
    },
};