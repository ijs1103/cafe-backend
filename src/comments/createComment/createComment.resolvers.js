import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{
    Mutation:{
        createComment: protectedResolver(
            async(_,{ shopId, payload}, { loggedInUser }) => {
                const ok = await client.coffeeShop.findUnique({
                    where:{
                        id: shopId,
                    },
                    select: {
                        id: true,
                    }
                });
                if(!ok){
                    return {
                        ok: false,
                        error: "존재하지 않는 카페입니다."
                    };
                }
                const newComment = await client.comment.create({
                    data: {
                        payload,
                        user:{
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                        shop:{
                            connect: {
                                id: shopId
                            }
                        }
                    }
                });
                return{
                    ok: true,
                    id: newComment.id
                };
            }
        )
    }
}