import { TransformEnumValues } from "@graphql-tools/wrap";
import client from "../../client";

export default {
    Query: {
      seeUser:  async(_,{ username,followingLastId,followersLastId }) => {
        const ok = client.user.findUnique({
            where:{
                username
            },
            select:{
                id: true
            }
        });
        if(!ok){
            return {
                ok: false,
                error: "user doesn't exist",
            }
        }
        const following = await client.user
            .findUnique({ where: { username }})
            .following({
                take: 5,
                skip: followingLastId ? 1 : 0,
                ...(followingLastId &&  { cursor: { id: followingLastId }}),
        });
        const followers = await client.user
            .findUnique({ where: { username }})
            .followers({
                take: 5,
                skip: followersLastId ? 1 : 0,
                ...(followersLastId &&  { cursor: { id: followersLastId }}),
        });
        return {
            ok: true,
            ...(following&&{following}),
            ...(followers&&{followers}),
        }
      }
    } 
};