import client from "../client";

export default {
    Category: {
        totalShops: ({id}) => client.category.count({
            where: {
                shops: {
                    some: {
                        id,
                    },
                },
            },
        }),
    },
    CoffeeShop: {
        isLiked: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
              return false;
            }
            const ok = await client.like.findUnique({
              where: {
                shopId_userId: {
                  shopId: id,
                  userId: loggedInUser.id,
                },
              },
              select: {
                id: true,
              },
            });
            if (ok) {
              return true;
            }
            return false;
        },
        likes: ({id}) =>
            client.like.count({
                where:{
                    shopId: id
                }
        }),
        comments: ({id}) => client.comment.findMany({where: {shopId: id}, include: { user: true }}),
        commentNumber: ({ id }) => client.comment.count({ where: { shopId: id } }),
    },
};