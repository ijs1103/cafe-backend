import { gql } from "apollo-server";

export default gql`
    type seeUserResult{
        ok: Boolean!
        error: String
        following: [User]
        followers: [User]
    }
    type Query {
        seeUser(username: String!, followingLastId: Int,followersLastId: Int): seeUserResult!
    }
`;