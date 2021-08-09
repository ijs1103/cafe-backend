import { gql } from "apollo-server";

export default gql`
    type UnfollowResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        unfollow(username: String!): UnfollowResult
    }
`;