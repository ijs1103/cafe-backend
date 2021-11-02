import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deleteCoffeeShop: protectedResolver(async (_, { id }, { loggedInUser }) => {
            const shop = await client.coffeeShop.findUnique({
                where: {
                    id,
                },
                select: {
                    UserId: true,
                },
            });
            if (!shop) {
                return {
                    ok: false,
                    error: "존재하지 않는 카페입니다.",
                };
            } else if (shop.UserId !== loggedInUser.id) {
                return {
                    ok: false,
                    error: "삭제할 권한이 없습니다.",
                };
            } else {
                await client.coffeeShopPhoto.deleteMany({
                    where: {
                        CoffeeShopId: id,
                    },
                });
                await client.like.deleteMany({
                    where: {
                        shopId: id,
                    },
                });
                await client.comment.deleteMany({
                    where: {
                        shopId: id,
                    },
                });
                await client.coffeeShop.delete({
                    where: {
                        id,
                    },
                });
                return {
                    ok: true,
                };
            }
        }),
    },
};