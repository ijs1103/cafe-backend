import client from "../../client";

export default {
    Query: {
        seeLikeShops: async(_,{UserId}) => {
                return client.shop.findMany({
                  where: {
                    likes: {
                      some: {
                        userId: UserId    
                      }
                    }
                  }
                });
        },
    }
};